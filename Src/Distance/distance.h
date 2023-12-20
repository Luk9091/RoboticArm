#ifndef __DISTANCE__H
#define __DISTANCE__H

#include <pico/stdlib.h>
#include <hardware/gpio.h>
#include <hardware/adc.h>

#define DISTANCE_PIN 26


uint distanceMeasure();


#endif