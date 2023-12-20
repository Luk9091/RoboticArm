#include "distance.h"


uint distanceMeasure(){
    adc_select_input(DISTANCE_PIN - 26);
    uint measure = adc_read();

    return measure;
}