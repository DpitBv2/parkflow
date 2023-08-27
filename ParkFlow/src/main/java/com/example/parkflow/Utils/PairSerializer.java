package com.example.parkflow.Utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class PairSerializer extends StdSerializer<Pair<?, ?>> {
    public PairSerializer(Class<Pair<?, ?>> t) {
        super(t);
    }

    @Override
    public void serialize(Pair pair, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeObjectField("first", pair.getFirst());
        jsonGenerator.writeObjectField("second", pair.getSecond());
        jsonGenerator.writeEndObject();
    }
}
