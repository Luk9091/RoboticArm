#ifndef __WEB_SERVER__CGI__H
#define __WEB_SERVER__CGI__H

#include <pico/cyw43_arch.h>
#include <lwip/apps/httpd.h>
#include <pico/stdlib.h>
#include "servo.h"


void cgi_init(
    Servo_t *arm,
    Servo_t *base,
    Servo_t *hand,
    Servo_t *rotor
);

#endif