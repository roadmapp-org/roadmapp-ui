package com.binnacle.api.entity;

import com.binnacle.api.model.Log;
import com.binnacle.api.model.Project;
import com.binnacle.api.model.Task;
import com.binnacle.api.model.Utility;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tasks")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;
    //private List<SubtaskEntity> subtaskList;
    //private List<LogEntity> logList;
    //private List<UtilityEntity> utilList;
}
