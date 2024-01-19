#ifndef __SERVO__H
#define __SERVO__H

#include <stdlib.h>
#include <pico/stdlib.h>

#include <hardware/gpio.h>
#include <hardware/pwm.h>
#include <hardware/adc.h>


#define SERVO_ARM_PIN       21
#define SERVO_BASE_PIN      20
#define SERVO_ROTOR_PIN     19
#define SERVO_HAND_PIN      18

// Servo config struct
// if not use check servo position change only GPIO
// On default:
// ADC_PIN = 0         -- not use
// enableMux = 0       -- not use
// enableState = false -- use only if enabled mux is used
typedef struct SERVO {
    bool start;
    uint GPIO;
    uint ADC_PIN;
    bool flipRead;
    int angle;
    int current_angle;
    uint step;
    int backUp;
    // int min;
    // int max;
} Servo_t;

// Servo initialization function, enable PWM
void Servo_init(Servo_t *servo);



void Servo_setAngle(Servo_t *servo, uint angle);
int Servo_readAngle(Servo_t *servo);

void Servo_goto(Servo_t *servo);

void Servo_start(Servo_t *servo);
void Servo_stop(Servo_t *servo);

#endif