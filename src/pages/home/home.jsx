import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component.jsx';
import { useEffect, useRef } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component.jsx';
import { getLevels } from "../../data/levels-slice";
import { LogCurrentFilterComponent } from '../../components/logs/log-current-filter-component.jsx';
import { fetchFilteredLogs } from "../../data/log-slice"

export const Home = () => {
    const levelsStatus = useSelector(state => state.levels.status)
    const logs = useSelector((state) => state.log.list)
    const currentProject = useSelector((state) => state.levels.selectedProject);
    const currentProjectRef = useRef();
    currentProjectRef.current = currentProject;
    const currentTask = useSelector((state) => state.levels.selectedTask);
    const currentTaskRef = useRef();
    currentTaskRef.current = currentTask;
    const dispatch = useDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
          dispatch(getLevels())
        }
      }, [])

    useEffect(() => {
      let isMounted = true;
      const handleScroll = () => {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            let params = [];
            let count = 0;
            if(currentProjectRef.current === 0 || currentTaskRef.current === 0)
              count = logs.length;
            else
              count = logs.filter(log => log.project_id === currentProjectRef.current && log.task_id === currentTaskRef.current).length;

            params["project"] = currentProjectRef.current;
            params["task"] = currentTaskRef.current;
            params["subtask"] = 0;
            params["alreadySent"] = count;  
            
            dispatch(fetchFilteredLogs(params))
          }
      };
  
      window.addEventListener('scroll', handleScroll);

      return () => {
          isMounted = false;
          window.removeEventListener('scroll', handleScroll);
      };
    }, [logs]);

    return (
      <>
        <div className="bg-custom-grey py-5 h-auto flex justify-center min-h-screen">
          <div className='flex flex-col w-5/6 sm:w-3/4 md:w-1/2'>
            <div className='container mx-auto'>
              <LogFilterComponent/>
            </div>
            {/* <div className='container mx-auto mt-5 border-b-2 pb-10'>
              <LogCreateForm/>
            </div> */}
            <div className='container mx-auto pb-10 flex flex-col items-center mb-5'>
              <LogListComponent/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center px-5 w-full h-15 bg-custom-black fixed bottom-0">
            <LogCurrentFilterComponent />
        </div>
      </>
    );
}