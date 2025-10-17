import { useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";
export default function CalendarContainer() {
  const [selected, setSelected] = useState("");
  return (
    <View style={{width: '100%'}}>
        <CalendarList 
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates = {{ 
            [ selected ] : { selected : true ,  disableTouchEvent : true ,  selectedColor : '#0ea7a5' } 
          }}
          pastScrollRange={3}
          futureScrollRange={3}
          scrollEnabled={true}
          theme={{
            textDayFontSize: 15,
            textMonthFontSize: 25, //상단 연도, 월
            textDayHeaderFontSize: 15
          }}
        />
    </View>
  );
}