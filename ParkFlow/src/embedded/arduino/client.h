#ifndef _CLIENT_H_
#define _CLIENT_H_

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

namespace IOT
{
    namespace Config
    {
        constexpr char *SSID = "Alex's Galaxy S22 Ultra";
        constexpr char *Password = "Alex.26042006";
        constexpr char *UpdateURL = "http://192.168.53.9:8080/api/v1/hubs/updatedSensors";
        constexpr char *Token = "parkflow";
    }

    class Client
    {
    public:
        Client()
        {
            WiFi.begin(Config::SSID, Config::Password);
            while (WiFi.status() != WL_CONNECTED)
            {
                delay(500);
                Serial.print(".");
            }
            Serial.println("");
            Serial.println("WiFi connected");
            Serial.println("IP address: ");
            Serial.println(WiFi.localIP());
        }

        String getRequest()
        {
            if (WiFi.status() == WL_CONNECTED)
            {
                HTTPClient http;
                http.begin((String)Config::UpdateURL + "?token=" + (String)Config::Token);
                int httpCode = http.GET();
                if (httpCode > 0)
                {
                    String payload = http.getString();
                    Serial.println(payload);
                    return payload;
                }
                http.end();
                return "linkError";
            }
            return "wifiError";
        }

        // TODO: Implement tell server that the parking spot is not free
        String sendRequest()
        {
        }

        int getData(String data)
        {
            Serial.println(data);
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, data);
            JsonObject obj = doc[0].as<JsonObject>();
            if (obj["isLifted"] == true)
                return 1;
            else if (obj["isLifted"] == false)
                return 0;
            else
                return -1;
        }
    };
}

#endif