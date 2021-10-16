#NOTE: YOU HAVE TO SET THE AUTH KEY YOURSELF

# Ideal output:
# no uuid x2
# no name x2
# no email x2
# no eventID x2
# no interactionType x2
# incorrect interactionType
# eventid not in cms
# event alrady over
# Incorrect auth token
# 200
# 200
# 200
# 200


#no uuid
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#empty uuid
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#no name
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#empty name
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#no email
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite", "eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#empty email
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#no eventID
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu", "interactionType": "inperson"}'

#empty eventID
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"", "interactionType": "inperson"}'

#no interactionType
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457"}'

#empty interactionType
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": ""}'

#incorrect interactionType
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "enrgr"}'

#event id not cms
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c038002fc7457", "interactionType": "inperson"}'

#event already over 
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c","name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"5f8093dc8f6dd100221f9293", "interactionType": "inperson"}'

#no auth
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer te' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'


# inperson create
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#inperson push
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"61562b7b1c03860022fc7457", "interactionType": "inperson"}'

#discord create
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"discord", "interactionType": "discord"}'

#discord push
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"discord", "interactionType": "discord"}'

#virtual create
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"virtual", "interactionType": "virtual"}'

#virtual push
curl -X POST http://localhost:3000/inperson/inpersoninteraction -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"uuid":"606e25a1-9b86-4af1-b849-8e0f0ec51b1c", "name":"Anish Thite","email":"anishthite@gatech.edu","eventID":"virtual", "interactionType": "virtual"}'
