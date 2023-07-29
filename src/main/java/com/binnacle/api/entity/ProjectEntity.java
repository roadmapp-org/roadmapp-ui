package com.binnacle.api.entity;

import com.binnacle.api.model.Log;
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
@Table(name = "projects")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String owner;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<TaskEntity> taskList;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<LogEntity> logList;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<UtilityEntity> utilList;
    private boolean active;

}
