cmake_minimum_required(VERSION 3.25)

set(PICO_BOARD pico_w)

include(/opt/pico/pico-sdk/external/pico_sdk_import.cmake)
include(/opt/pico/pico-sdk/tools/CMakeLists.txt)

project(main C CXX ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17) 

pico_sdk_init()

add_executable(${PROJECT_NAME}
    main.c
    # I2C/i2c.c
    # Distance/distance.c
    Servo/servo.c
    WebSerwer/utilities/utilities.c
    WebSerwer/URL/ssi.c
    WebSerwer/URL/cgi.c
    Overcurrent/OC.c
)

# include_directories(I2C)
# include_directories(Distance)
include_directories(Servo)
include_directories(WebSerwer)
include_directories(WebSerwer/utilities)
include_directories(WebSerwer/URL)
include_directories(Overcurrent)

pico_add_extra_outputs(${PROJECT_NAME})

target_link_libraries(${PROJECT_NAME}
    pico_stdlib
    pico_stdio
    pico_multicore
    
    # pico_cyw43_arch_none
    pico_cyw43_arch_lwip_threadsafe_background
    pico_lwip_http

    hardware_clocks
    hardware_gpio
    hardware_adc
    hardware_pwm
    hardware_timer
    # hardware_i2c
)


pico_enable_stdio_usb(${PROJECT_NAME} 1)
pico_enable_stdio_uart(${PROJECT_NAME} 1)
