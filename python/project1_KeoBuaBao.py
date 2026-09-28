from random import randint

print("Nhap Keo,Bua,Bao: ")
player = input()
computer = randint(0,2)



if computer == 0:
    computer = "Keo"
if computer == 1:
    computer = "Bua"
if computer == 2:
    computer = "Bao"


print ("---")
print("You choose: " + player)
print("Computer chooses: " + computer)
print("---")

if player == "Keo":
    if computer =="Bua":
        print ("Lose")
    if computer =="Keo":
        print ("Draw")
    if computer =="Bao":
        print ("Win")   

if player == "Bao":
    if computer =="Bua":
        print ("Win")
    if computer =="Keo":
        print ("Lose")
    if computer =="Bao":
        print ("Draw")  

if player == "Bua":
    if computer =="Bua":
        print ("Draw")
    if computer =="Keo":
        print ("Win")
    if computer =="Bao":
        print ("Lose")   







