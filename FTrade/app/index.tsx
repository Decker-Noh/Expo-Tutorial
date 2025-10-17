import CalendarContainer from "@/components/CalendarContainer";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
            borderWidth: 2,           // 테두리의 두께 (2 픽셀)
    borderColor: 'red',       // 테두리의 색상 (빨간색)
    borderStyle: 'solid',     // 테두리의 스타일 ('solid', 'dotted', 'dashed' 중 선택)
      }}
    >
      <Pressable onPress={()=>{console.log("click")}}><Text>클릭점</Text></Pressable>
      <CalendarContainer />
      <Text>반갑습니데이!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor : '#ffffff',
    alignItems : 'center'

  },
});