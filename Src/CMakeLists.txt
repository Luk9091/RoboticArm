cmake_minimum_required(VERSION 3.25)

include(/opt/pico/pico-sdk/external/pico_sdk_import.cmake)
include(/opt/pico/pico-sdk/tools/CMakeLists.txt)

project(main C CXX ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17) 

pico_sdk_init()

add_executable(${PROJECT_NAME}
    main.c
    I2C/i2c.c
    Distance/distance.c
    Servo/servo.c
)

include_directories(I2C)
include_directories(Distance)
include_directories(Servo)

pico_add_extra_outputs(${PROJECT_NAME})

target_link_libraries(${PROJECT_NAME}
    pico_stdlib
    pico_stdio
    pico_multicore
    
    pico_cyw43_arch_none

    hardware_clocks
    hardware_gpio
    hardware_adc
    hardware_pwm
    hardware_i2c
)


pico_enable_stdio_usb(${PROJECT_NAME} 0)
pico_enable_stdio_uart(${PROJECT_NAME} 1)