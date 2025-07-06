import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CATEGORY_ICONS = {
	"Food & Drinks": "fast-food",
	Shopping: "cart",
	Transportation: "car",
	Entertainment: "film",
	Bills: "receipt",
	Income: "cash",
	Other: "ellipsis-horizontal",
};

type TransactionType = {
	id: string;
	title: string;
	category: string;
	amount: number;
	date: string;
	description: string;
};

type TransactionProps = {
	transaction: TransactionType;
	onDelete: (id: string) => void;
};

const TransactionCard = ({ transaction, onDelete }: TransactionProps) => {
	const isIncome = parseFloat(transaction.amount.toString()) > 0;
	const iconName =
		CATEGORY_ICONS[transaction.category as keyof typeof CATEGORY_ICONS] ||
		"pricetag-outline";

	return (
		<View style={styles.transactionCard} key={transaction.id}>
			<TouchableOpacity style={styles.transactionContent}>
				<View style={styles.categoryIconContainer}>
					<Ionicons
						name={iconName as keyof typeof Ionicons.glyphMap}
						size={22}
						color={isIncome ? COLORS.income : COLORS.expense}
					/>
				</View>
				<View style={styles.transactionLeft}>
					<Text style={styles.transactionTitle}>{transaction.title}</Text>
					<Text style={styles.transactionCategory}>{transaction.category}</Text>
				</View>
				<View style={styles.transactionRight}>
					<Text
						style={[
							styles.transactionAmount,
							{ color: isIncome ? COLORS.income : COLORS.expense },
						]}
					>
						{isIncome ? "+" : "-"}$
						{Math.abs(parseFloat(transaction.amount.toString())).toFixed(2)}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => onDelete(transaction.id)}
			>
				<Ionicons name='trash-outline' size={20} color={COLORS.expense} />
			</TouchableOpacity>
		</View>
	);
};

export default TransactionCard;
