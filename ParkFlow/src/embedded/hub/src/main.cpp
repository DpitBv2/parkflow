#include "hardware.h"
#include "client.h"

std::unique_ptr<Hardware::RGB> rgb;
std::unique_ptr<Hardware::Screen> screen;
std::unique_ptr<Hardware::GSM> gsm;
std::unique_ptr<Hardware::LoRaTransceiver> lora;

std::unique_ptr<IOT::Client> client;

void display(int connections)
{
    screen->clear();
    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: " + String(connections));
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices");
    delay(500);
}

void setup()
{
    Serial.begin(115200);

    rgb = std::unique_ptr<Hardware::RGB>(new Hardware::RGB(27, 26, 25));
    screen = std::unique_ptr<Hardware::Screen>(new Hardware::Screen());

    rgb->light(255, 0, 0);

    lora = std::unique_ptr<Hardware::LoRaTransceiver>(new Hardware::LoRaTransceiver());
    // gsm = std::unique_ptr<Hardware::GSM>(new Hardware::GSM());
    client = std::unique_ptr<IOT::Client>(new IOT::Client());

    delay(2000);

    rgb->light(0, 0, 255);

    display(0);

    lora->sendData("PING");
    String data = "";
    while (data != "PONG")
        data = lora->recieveData();

    rgb->light(0, 255, 0);
    display(1);

    delay(1000);
}

void loop()
{
    String data = client->getRequest();
    if (data != "")
    {
        int response = client->getData(data);
        if (response == 1)
        {
            lora->sendData("CLOSE");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            Serial.println(data);

            if (data == "ACCEPT")
                rgb->light(0, 255, 0);
            else if (data == "REJECT")
                rgb->light(255, 0, 0);
        }
        else if (response == 0)
        {
            lora->sendData("OPEN");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            Serial.println(data);

            if (data == "ACCEPT")
                rgb->light(0, 255, 0);
        }
    }

    delay(5000);
}