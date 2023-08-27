package com.example.parkflow.Utils;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@JsonSerialize(using = ResponseExceptionSerializer.class)
public class ResponseException extends RuntimeException {
    private String message;
    private HttpStatus status = HttpStatus.BAD_REQUEST;

    public ResponseException(String message) {
        super(message);
        this.message = message;
    }

    public ResponseException(String message, HttpStatus status) {
        super(message);
        this.message = message;
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public ResponseEntity<ResponseException> toResponseEntity() {
        return ResponseEntity.status(status).body(this);
    }
}
