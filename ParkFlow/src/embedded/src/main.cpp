#include "hardware.h"

std::unique_ptr<Hardware::RGB> rgb;
std::unique_ptr<Hardware::Screen> screen;
std::unique_ptr<Hardware::GSM> gsm;

void setup() {
    Serial.begin(115200);
    
    rgb = std::unique_ptr<Hardware::RGB>(new Hardware::RGB(27, 26, 25));
    screen = std::unique_ptr<Hardware::Screen>(new Hardware::Screen());

    rgb->light(255, 0, 0);

    gsm = std::unique_ptr<Hardware::GSM>(new Hardware::GSM());

    rgb->light(0, 0, 255);
    screen->clear();

    delay(5000);
}

void loop() {
}