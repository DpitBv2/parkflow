#ifndef _DATA_H_
#define _DATA_H_

namespace data
{
    struct Sensor
    {
        int id;
        bool isRaised;
        int channel;

        Sensor(int id, bool isRaised, int channel)
        {
            this->id = id;
            this->isRaised = isRaised;
            this->channel = channel;
        }

        bool open(std::unique_ptr<hardware::LoRaTransceiver> lora)
        {
            lora->sendData("OPEN");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            isLifted = false;
            Serial.println(data);

            if (data == "ACCEPT")
                return true;

            return false;
        }

        bool close(std::unique_ptr<hardware::LoRaTransceiver> lora)
        {
            lora->sendData("CLOSE");

            String data = "";
            while (data == "")
                data = lora->recieveData();

            isLifted = true;
            Serial.println(data);

            if (data == "ACCEPT")
                return true;
            else if (data == "REJECT")
                return false;
        }
    }

    std::list<data::Sensor>
        sensors;

    Sensor findSensorById(int id)
    {
        for (auto sensor : sensors)
        {
            if (sensor.id == id)
            {
                return sensor;
            }
        }

        return nullptr;
    }
}

#endif