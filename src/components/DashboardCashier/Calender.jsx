import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@chakra-ui/react";

export default function CalendarExample() {
    const today = new Date();
  return (
    <Box 
    mt="5"
    fontFamily={'cursive'}
    fontSize="9" 
    bgColor="rgba(255,255,255, 0.2)"
    borderRadius={"2xl"}
    p="2"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dayMaxEventRows={5} // Change this value to adjust the column size
        dayMaxEvents={true} // Adjust this value if you want to limit the number of events per day
        nowIndicator={true} // Show a line on the current time (today's date)
        now={today} // Set the current date and time
        // You can use the 'eventBackgroundColor' and 'eventBorderColor' props to customize event colors
        // For example:
        eventBackgroundColor="black"
        eventBorderColor="black"
      />
    </Box>
  );
}
