/**
 * Transactions Store Module
 * 
 * This store manages the application's transaction data, providing a central
 * source of truth for components that need to display, add, or modify transactions.
 * 
 * Features:
 * - Stores transaction history with consistent data structure
 * - [getAllTransactions] Gets all transactions
 * - [addTransaction] add new transactions
 * - [formatDateForDisplay] format date
 * - [getRecentTransactions] get recent transactions (limit 5)
 * - Includes category information and styling used across the application
 * - Supports retrieving filtered/sorted transaction lists
 * 
 * Usage:
 * import transactionsStore from '@/stores/transactions';
 * 
 * // Get all transactions
 * const allTransactions = transactionsStore.getAllTransactions();
 * 
 * // Add a new transaction
 * transactionsStore.addTransaction({
 *   category: 3,
 *   description: 'Lunch',
 *   amount: '15.75',
 *   date: '2024-09-01',
 *   merchant: 'Restaurant'
 * });
 */

export const categories = [
  {
    id: 1,
    name: 'Education',
    icon: 'education',
    iconBg: '#46BDC6'
  },
  {
    id: 2,
    name: 'Entertainment',
    icon: 'entertainment',
    iconBg: '#FF8301'
  },
  {
    id: 3,
    name: 'Food',
    icon: 'food',
    iconBg: '#213B80'
  },
  {
    id: 4,
    name: 'Groceries',
    icon: 'groceries',
    iconBg: '#00BC38'
  },
  {
    id: 5,
    name: 'Healthcare',
    icon: 'healthcare',
    iconBg: '#AD3B9B'
  },
  {
    id: 6,
    name: 'Housing',
    icon: 'housing',
    iconBg: '#FF373C'
  },
  {
    id: 7,
    name: 'Miscellaneous',
    icon: 'miscellaneous',
    iconBg: '#B0866D'
  },
  {
    id: 8,
    name: 'Office',
    icon: 'office',
    iconBg: '#E4759D'
  },
  {
    id: 9,
    name: 'Pets',
    icon: 'pets',
    iconBg: '#783F05'
  },
  {
    id: 10,
    name: 'Shopping',
    icon: 'shopping',
    iconBg: '#386BBC'
  },
  {
    id: 11,
    name: 'Subscriptions',
    icon: 'subscriptions',
    iconBg: '#4F7F88'
  },
  {
    id: 12,
    name: 'Transportation',
    icon: 'transportation',
    iconBg: '#FFB900'
  },
  {
    id: 13,
    name: 'Travel',
    icon: 'travel',
    iconBg: '#8E7CC3'
  },
  {
    id: 14,
    name: 'Utilities',
    icon: 'utilities',
    iconBg: '#009EDF'
  }
];

// Category and icons mapping. Move to const file.
export const categoryIcons = {
  food: {
    src: "/src/assets/img/food-icon-white.png",
    alt: "Food category icon"
  },
  entertainment: {
    src: "/src/assets/img/entertainment-icon.png",
    alt: "Entertainment category icon"
  },
  education: {
    src: "/src/assets/img/education-icon-white.png",
    alt: "Education category icon"
  },
  groceries: {
    src: "/src/assets/img/groceries-icon-white.png",
    alt: "Groceries category icon"
  },
  healthcare: {
    src: "/src/assets/img/healthcare-icon-white.png",
    alt: "Healthcare category icon"
  },
  housing: {
    src: "/src/assets/img/housing-icon-white.png",
    alt: "Housing category icon"
  },
  miscellaneous: {
    src: "/src/assets/img/misc-icon-white.png",
    alt: "Miscellaneous category icon"
  },
  office: {
    src: "/src/assets/img/office-icon-white.png",
    alt: "Office category icon"
  },
  pets: {
    src: "/src/assets/img/pets-icon-white.png",
    alt: "Pet category icon"
  },
  shopping: {
    src: "/src/assets/img/shopping-icon-white.png",
    alt: "Shopping category icon"
  },
  subscriptions: {
    src: "/src/assets/img/subscriptions-icon-white.png",
    alt: "Subscriptions category icon"
  },
  transportation: {
    src: "/src/assets/img/transportation-icon-white.png",
    alt: "Transportation category icon"
  },
  travel: {
    src: "/src/assets/img/travel-icon-white.png",
    alt: "Travel category icon"
  },
  utilities: {
    src: "/src/assets/img/utilities-icon-white.png",
    alt: "Utilities category icon"
  }
};

export const useTransactionsStore = () => {
  // Starting with an empty transactions array.
  // Note: If we want to initialize with our mock spending data,
  // we would need to import and use the hardcoded values here [...hardcodedMockData].
  let transactions = [];
  
  const getAllTransactions = () => {
    return [...transactions];
  };

  const addTransaction = (newTransaction) => {
    // Get the category name from the category ID
    const categoryObj = categories.find(cat => cat.id === newTransaction.category);
    if (!categoryObj) {
      console.error("Invalid category ID:", newTransaction.category);
      return false;
    }
    
    console.log("Original transaction:", newTransaction);
    
    // Create transaction in the format expected by the chart
    const formattedTransaction = {
      date: newTransaction.date, // Assuming YYYY-MM-DD format
      category: categoryObj.name, // Convert category ID to name
      amount: parseFloat(newTransaction.amount) * 20, // Apply conversion factor to match chart's expectations
      description: newTransaction.description,
      merchant: newTransaction.merchant
    };
    
    console.log("Formatted transaction for store:", formattedTransaction);
    
    // Add to our internal array
    transactions.push(formattedTransaction);
    
    return formattedTransaction;
  };
  
  const getRecentTransactions = (limit = 5) => {
    // Sort by date (newest first) and return limited number
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
      .map(transaction => {
        // Format for display in the transactions list
        return {
          date: formatDateForDisplay(transaction.date),
          category: transaction.category,
          description: transaction.description || 'Transaction', // Default if missing
          amount: transaction.amount / 20, // Convert back to actual dollar amount
          merchant: transaction.merchant || transaction.category // Default to category if merchant missing
        };
      });
  };
  
  // Helper to format date from YYYY-MM-DD to MM-DD-YYYY for display
  // Maybe MomentJS for dates
  const formatDateForDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-');

    return `${month}-${day}-${year}`;
  };
  
  return {
    getAllTransactions,
    addTransaction,
    getRecentTransactions
  };
};

export default useTransactionsStore();
