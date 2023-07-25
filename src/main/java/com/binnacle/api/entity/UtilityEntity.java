package com.binnacle.api.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "utilities")
public class UtilityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private ProjectEntity project;
    private TaskEntity task;
    private SubtaskEntity subtask;
    private LocalDate date;
    private String key;
    private String value;
}
