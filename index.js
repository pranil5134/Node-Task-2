const express = require("express");
const app = express();
const port = process.env.PORT ||  5000;

app.use(express.json())
let Room_details = []
let Room_booking = []
let List_of_customer = []
//To get room details
app.get("/roomdetails", (req, resp) => {
    try {
        resp.send(Room_details)
    }
    catch (e) {
        resp.send(e)
    }

})

//to add room details
app.post("/roomdetails", (req, res) => {
    Room_details.push({
        Seats: req.body.Seats,
        Aminity: req.body.Aminity,
        Price_perHour: req.body.Price_perHour,
        Room_number: Room_details.length + 1

    })
    res.status(200).json({ message: "Room is created" })
})

//TO get booked room detail
app.get("/bookroom", (req, resp) => {

    resp.send(Room_booking)
})

// To get of list_cutomer
app.get("/list_customer", (req, resp) => {
    resp.send(List_of_customer)

})

// To book a room
app.post("/bookroom", (req, res) => {
    try {
        let room_not_found = 1;
        let room_not_available = 1;
        for (let room = 0; room < Room_details.length; room++) {
            console.log("for")
            if (Room_booking.length == 0 && Room_details[room].Room_number == req.body.Room_ID) {
                console.log("if")
                if (Room_booking.length == 0) {
                    Room_booking.push({
                        Customer_name: req.body.Customer_name,
                        Booked_Status: true,
                        Date: req.body.Date,
                        Start_time: req.body.Start_time,
                        End_time: req.body.End_time,
                        Room_ID: req.body.Room_ID
                    })
                    List_of_customer.push({
                        Customer_name: req.body.Customer_name,
                        Date: req.body.Date,
                        Start_time: req.body.Start_time,
                        End_time: req.body.End_time,
                        Room_ID: req.body.Room_ID
                    })
                    console.log(" message: '1st Room is booked'")
                    room_not_found = 0
                    break;
                }
            }
            else {
                console.log(" else")

                for (let roombooking = 0; roombooking < Room_booking.length; roombooking++) {
                    console.log(Room_booking[roombooking].Room_ID, req.body.Room_ID)

                    if (req.body.Date != Room_booking[roombooking].Date && Room_booking[roombooking].Room_ID == req.body.Room_ID) {
                        console.log(Room_booking[roombooking].Room_ID, req.body.Room_ID)
                        Room_booking.push({
                            Customer_name: req.body.Customer_name,
                            Booked_Status: true,
                            Date: req.body.Date,
                            Start_time: req.body.Start_time,
                            End_time: req.body.End_time,
                            Room_ID: req.body.Room_ID
                        })
                        List_of_customer.push({
                            Customer_name: req.body.Customer_name,
                            Date: req.body.Date,
                            Start_time: req.body.Start_time,
                            End_time: req.body.End_time,
                            Room_ID: req.body.Room_ID
                        })
                        res.send(" message: '2nd Room is booked'")
                        room_not_found = 0
                        room_not_available = 0
                        break;
                    }
                    else if (Room_details[room].Room_number == req.body.Room_ID && room_not_available && Room_booking[roombooking].Room_ID != req.body.Room_ID) {
                        Room_booking.push({
                            Customer_name: req.body.Customer_name,
                            Booked_Status: true,
                            Date: req.body.Date,
                            Start_time: req.body.Start_time,
                            End_time: req.body.End_time,
                            Room_ID: req.body.Room_ID
                        })
                       List_of_customer.push({
                            Customer_name: req.body.Customer_name,
                            Date: req.body.Date,
                            Start_time: req.body.Start_time,
                            End_time: req.body.End_time,
                            Room_ID: req.body.Room_ID
                        })
                        console.log(" message: '2nd Room is booked'")
                        room_not_found = 0
                        room_not_available = 0
                        break;
                    }

                }
                if (room_not_available + 1 == 1) {
                    break;
                }


            }


        }
        if (room_not_found) {
            res.send({ Message: "Room not found for booking" })

        }
    }
    catch (err) {
        console.log(err)
    }
    finally {
        res.end()
    }

})

app.listen(port, (req, resp) => {

    console.log(` listening to port ${port}`)
})
