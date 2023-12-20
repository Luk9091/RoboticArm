#include "i2c.h"

#define SDA_PIN 18
#define SCL_PIN 19


// Value in Hz
// Example: 100 * 1000 = 100kHz
#define FREQUENCY 100 * 1000
#define PULLUP true

void I2C_Init(){
    static int isInit = 0;
    if (isInit) return;
    i2c_init(I2C_CHANNEL, FREQUENCY);

    gpio_set_function(SDA_PIN, GPIO_FUNC_I2C);
    gpio_set_function(SCL_PIN, GPIO_FUNC_I2C);

    #if PULLUP
        gpio_pull_up(SDA_PIN);
        gpio_pull_up(SCL_PIN);
    #endif
    isInit = 1;
}

int I2C_scan(){
    I2C_Init();
    int ret;
    uint8_t rxData;
    uint dev = 0;

    printf("\nI2C Scan\n");

    for (uint8_t address = 0; address < 128; ++address){
        ret = i2c_read_blocking(I2C_CHANNEL, address, &rxData, 1, false);

        if (ret >= 0){
            printf("Address: 0x");
            if(address < 16) printf("0");
            printf("%X\n", address);
            dev++;
        }
    }

    if(dev == 0){
        printf("Dont find any devices!\n");
        return -1;
    }
    return 0;
}

void I2C_writeReg(uint8_t dev, uint8_t reg, uint8_t data){
    I2C_write(dev, reg);
    I2C_write(dev, data);
}

uint8_t I2C_readReg(uint8_t dev, uint8_t reg){
    uint8_t data;
    I2C_write(dev, reg);
    if (I2C_read(dev, &data) == 0)
        return data;
    return 0;
}