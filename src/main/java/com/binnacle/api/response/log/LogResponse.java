package com.binnacle.api.response.log;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LogResponse {

    private int id;
    private boolean active;
    private int project_id;
    private int task_id;
    private int subtask_id;
    private String log;
    private String date;

}
