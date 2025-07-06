import { API_URL } from "@/constants/api";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

// const API_URL = "https://wallet-api-wydo.onrender.com/api/transactions";
// const API_URL = "http://localhost:5001/api/transactions";

export const useTransactions = (userId: string | undefined) => {
	const [transactions, setTransactions] = useState([]);

	const [summary, setSummary] = useState({
		balance: 0,
		income: 0,
		expenses: 0,
	});

	const [isLoading, setIsLoading] = useState(true);

	const fetchTransactions = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/${userId}`);
			const data = await response.json();
			setTransactions(data);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	}, [userId]);

	const fetchSummary = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/summary/${userId}`);
			const data = await response.json();
			setSummary(data);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	}, [userId]);

	const loadData = useCallback(async () => {
		if (!userId) return;
		setIsLoading(true);

		try {
			await Promise.all([fetchTransactions(), fetchSummary()]);
		} catch (error) {
			console.error("Error loading data:", error);
		} finally {
			setIsLoading(false);
		}
	}, [fetchTransactions, fetchSummary, userId]);

	const deleteTransaction = async (id: string) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Failed to delete transaction");
			}

			loadData();
			Alert.alert("Transaction deleted");
		} catch (error: any) {
			console.error("Error deleting transaction:", error);
			Alert.alert("Error", error.message);
		}
	};

	return { transactions, summary, isLoading, loadData, deleteTransaction };
};
