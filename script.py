import csv
import json


def removeEmpty(x):
    if x == '':
        return False
    else:
        return True

coordict = {}
with open('./data.tsv') as file:
    reader = csv.reader(file, delimiter=' ')
    for line in reader:
        filtered = list(filter(removeEmpty, line))
        coordict[filtered[0]] = filtered[1]

        
placedict = {}
with open('/Users/chonsou/Downloads/list_of_properties.tsv') as file:
    reader = csv.reader(file, delimiter='\t')
    for line in reader:
        placedict[line[0]] = line

for key in coordict.keys():
    placedict[key][6] = coordict[key]

print(placedict)

with open('./output.tsv', 'w') as file:
    writer = csv.writer(file, delimiter='\t')
    for key in placedict.keys():
        writer.writerow(placedict[key])


jsondict = []
for key in placedict.keys():
    el = placedict[key]
    jsondict.append({
        "id": el[0],
        "category": el[1],
        "name": el[2],
        "address": el[3],
        "island": el[4],
        "numFaces": el[5],
        "coordinates": el[6],
        "image": el[7]
    })
with open('./output.json', 'w') as file:
    json.dump(jsondict, file, indent=4)
