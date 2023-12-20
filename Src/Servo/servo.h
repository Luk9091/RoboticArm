#ifndef __SERVO__H
#define __SERVO__H

#include <pico/stdlib.h>

#include <hardware/gpio.h>
#include <hardware/pwm.h>
#include <hardware/adc.h>

// Servo config struct
// if not use check servo position change only GPIO
// On default:
// ADC_PIN = 0         -- not use
// enableMux = 0       -- not use
// enableState = false -- use only if enabled mux is used
typedef struct SERVO {
    uint GPIO;
    uint ADC_PIN;
    bool flipRead;
    // int min;
    // int max;
} Servo_t;

// void Servo_init(int servoPin, int readPin, );

// Servo initialization function, enable PWM
void Servo_init(Servo_t *servo);



void Servo_setAngle(Servo_t *servo, uint angle);
int Servo_readAngle(Servo_t *servo);


#endif