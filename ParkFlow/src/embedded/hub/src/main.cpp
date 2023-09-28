#include "hardware.h"
#include "client.h"

std::unique_ptr<Hardware::RGB> rgb;
std::unique_ptr<Hardware::Screen> screen;
std::unique_ptr<Hardware::GSM> gsm;
std::unique_ptr<Hardware::LoRaTransceiver> lora;

std::unique_ptr<IOT::Client> client;

bool isOpen = false;

void setup()
{
    Serial.begin(115200);

    rgb = std::unique_ptr<Hardware::RGB>(new Hardware::RGB(27, 26, 25));
    screen = std::unique_ptr<Hardware::Screen>(new Hardware::Screen());

    rgb->light(255, 0, 0);

    lora = std::unique_ptr<Hardware::LoRaTransceiver>(new Hardware::LoRaTransceiver());
    gsm = std::unique_ptr<Hardware::GSM>(new Hardware::GSM());
    client = std::unique_ptr<IOT::Client>(new IOT::Client());

    delay(2000);

    rgb->light(0, 0, 255);
    screen->clear();
}

void display()
{
    screen->clear();
    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: 0");
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices");
    delay(500);
}

void loop()
{
    String data = client->getRequest();
    if (client->getData(data) && data != "")
    {
        if (isOpen)
        {
            lora->sendData("CLOSE");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            isOpen = false;
            Serial.println(data);

            if (data == "ACCEPT")
                rgb->light(0, 255, 0);
            else if (data == "REJECT")
                rgb->light(255, 0, 0);
        }
        else
        {
            lora->sendData("OPEN");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            isOpen = true;
            Serial.println(data);

            if (data == "ACCEPT")
                rgb->light(0, 255, 0);
        }
    }

    delay(5000);
}