import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component.jsx';
import { useEffect } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component.jsx';
import { getLevels } from "../../data/levels-slice";
import { getLogs } from "../../data/log-slice"
import { LogCreateForm } from '../../components/logs/log-create-form.jsx';
import { LogCurrentFilterComponent } from '../../components/logs/log-current-filter-component.jsx';

export const Home = () => {
    
    const levelsStatus = useSelector(state => state.levels.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
          dispatch(getLevels())
        }
      }, [])

    useEffect(() => {
      if (levelsStatus === 'idle') {
        dispatch(getLogs())
      }
    }, [])

    return (
      <>
        <div className="bg-gray-200 py-5 h-auto flex justify-center min-h-screen">
          <div className='flex flex-col w-5/6 sm:w-3/4 md:w-1/2'>
            <div className='container mx-auto'>
              <LogFilterComponent/>
            </div>
            {/* <div className='container mx-auto mt-5 border-b-2 pb-10'>
              <LogCreateForm/>
            </div> */}
            {/* <div className='container mx-auto mt-5 border-b-2 pb-10 flex flex-col items-center'>
              <LogListComponent/>
            </div> */}
          </div>
        </div>
        <div className="w-full h-24 bg-custom-black fixed bottom-0">
            <LogCurrentFilterComponent />
        </div>
      </>
    );
}