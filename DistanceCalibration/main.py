import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from scipy.optimize import curve_fit

def fitFunction(x, a, b, c):
    return (x**2)*a + (x**1)*b + (x**0)*c

data = pd.read_csv("data.csv")
data = data.sort_values(by="distance", ascending=True)
distance = []
value = []
minimum = min(data["value"].values)

for (dis, val) in data.values:
    if dis <= 6:
        if not dis in distance:
            distance.append(dis)
            value.append(val - minimum)
        else:
            value[-1] += val - minimum
            value[-1] = value[-1] / 2

parameters, _ = curve_fit(fitFunction, value, distance)
(a, b, c) = parameters

x = np.linspace(min(value), max(value)+0.1, 100)
y = fitFunction(x, a, b, c)

print(f"Parameters: {parameters}")

plt.plot(value, distance, ".-")
plt.plot(x, y)
plt.grid()
plt.show()