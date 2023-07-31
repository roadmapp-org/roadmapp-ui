package com.binnacle.api.utils.exceptions;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UpdateNotAllowedException extends Exception {
    private List<String> descriptions;
    public UpdateNotAllowedException(String message) {
        super(message);
    }

    public UpdateNotAllowedException(String message, String... descriptions) {
        super(message);
        List<String> messageList = new ArrayList<>();
        for (String description : descriptions) {
            messageList.add(description);
        }
        this.descriptions = messageList;
    }

}
