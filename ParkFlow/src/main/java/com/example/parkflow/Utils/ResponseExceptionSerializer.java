package com.example.parkflow.Utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class ResponseExceptionSerializer extends StdSerializer<ResponseException> {
    public ResponseExceptionSerializer() {
        this(null);
    }

    public ResponseExceptionSerializer(Class<ResponseException> t) {
        super(t);
    }

    @Override
    public void serialize(
            ResponseException e,
            JsonGenerator jsonGenerator,
            SerializerProvider serializerProvider
    ) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("message", e.getMessage());
        jsonGenerator.writeEndObject();
    }
}
