package com.example.parkflow.Service;

public interface FileService {
    String upload(String fileName, byte[] fileContent);
    byte[] getContent(String fileName);
    byte[] download(String fileName);
    void delete(String fileName);
}
