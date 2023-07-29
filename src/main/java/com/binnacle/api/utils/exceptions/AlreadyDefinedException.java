package com.binnacle.api.utils.exceptions;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
@Getter
public class AlreadyDefinedException extends Exception {
    private List<String> descriptions;
    public AlreadyDefinedException(String message) {
        super(message);
    }

    public AlreadyDefinedException(String message, String... descriptions) {
        super(message);
        List<String> messageList = new ArrayList<>();
        for (String description : descriptions) {
            messageList.add(description);
        }
        this.descriptions = messageList;
    }

}
