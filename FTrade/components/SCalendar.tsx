import { useFonts } from 'expo-font';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function SCalendar() {
    const [fontLoaded] = useFonts({
        'pretendard-regurlar': require('../assets/fonts/Pretendard-Regular.ttf'),
        'pretendard-bold': require('../assets/fonts/Pretendard-Bold.ttf')
    })
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const GoToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    const GoToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    interface CalendarCell {
        day: string | number;
        isInCurrentMonth: boolean;
    }

    const GenerateMatrix = () => {
        let matrix: (string[] | CalendarCell[])[] = [];
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        matrix[0] = days;

        let year = currentMonth.getFullYear();
        let month = currentMonth.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let maxDays = new Date(year, month + 1, 0).getDate();
        let counter = -firstDay + 1;
        
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                let cellValue = counter > 0 && counter <= maxDays ? counter : '';
                matrix[row][col] = { 
                    day: cellValue, 
                    isInCurrentMonth: (counter > 0 && counter <= maxDays)
                };
                counter++;
            }
        }
        return matrix;
    };

    const GetTextStyle = (rowIndex: number, colIndex: number, item: CalendarCell) => {
        if (rowIndex === 0) {
            return styles.headerText;  // 헤더 스타일
        }

        if (!item.isInCurrentMonth) {
            return styles.anotherCellText;  // 다른 달
        } else if (colIndex === 0) {
            return styles.cellTextRed;      // 일요일
        } else if (colIndex === 6) {
            return styles.cellTextBlue;     // 토요일
        } else {
            return styles.cellText;         // 평일
        }
    };

    const RenderCalendar = () => {
        let matrix = GenerateMatrix();
        
        return (
            <View style={styles.calendar}>
                {matrix.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((item, colIndex) => {
                            // 헤더 행
                            if (rowIndex === 0) {
                                return (
                                    <View key={colIndex} style={styles.cell}>
                                        <Text style={styles.headerText}>{item.toString()}</Text>
                                    </View>
                                );
                            }

                            // 날짜 행
                            let tItem = item as CalendarCell;
                            const textStyle = GetTextStyle(rowIndex, colIndex, tItem);

                            return (
                                <TouchableOpacity
                                    key={colIndex}
                                    style={styles.cell}
                                    onPress={() => {
                                        console.log(`선택된 날짜: ${tItem.day}`);
                                        if (tItem.day !== '') {
                                            setSelectedDay(tItem.day as any);
                                        }
                                    }}
                                    disabled={!tItem.isInCurrentMonth || tItem.day === ''}
                                >
                                    <Text style={textStyle}>{tItem.day}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {/* 헤더: 월 이동 버튼 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={GoToPreviousMonth} style={styles.navButton}>
                    <Text style={styles.navButtonText}>◀</Text>
                </TouchableOpacity>

                <Text style={styles.monthText}>
                    {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                </Text>

                <TouchableOpacity onPress={GoToNextMonth} style={styles.navButton}>
                    <Text style={styles.navButtonText}>▶</Text>
                </TouchableOpacity>
            </View>

            {/* 달력 렌더링 */}
            {RenderCalendar()}

            {/* 선택된 날짜 표시 */}
            {selectedDay && (

                <Text style={styles.cellTextRed}>
                    선택된 날짜: {selectedDay}일
                </Text>
 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#9966CC',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    navButton: {
        padding: 10,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    monthText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    calendar: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    cellTextRed: {
        color: '#E0115F',
        fontSize: 16,
        fontFamily: 'pretendard-bold'
    },
    cellTextBlue: {
        color: '#0400ff',
        fontSize: 16,
        fontFamily: 'pretendard-bold'
    },
    cellText: {
        color: '#ffffff',
        fontSize: 16,
    },
    anotherCellText: {
        color: '#ffffff70',
        fontSize: 16,
    },
    selectedText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});