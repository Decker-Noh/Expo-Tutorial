import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
interface HeaderProps{
	title: string;
}
const Header = (props: HeaderProps) => {
	return <Text>{props.title}</Text>
}

export default function App() {
	return (
		<View style={styles.container}>
			<Text></Text>
			<Header title="친구" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
