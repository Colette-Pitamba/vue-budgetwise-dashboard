<script setup>
  /**
   * RecentTransactions Component
   * 
   * This component displays a list of recent financial transactions with their details.
   * It includes transaction name, category with icon, amount, and date.
   * 
   * Features:
   * - Displays transactions in a clean card layout
   * - Shows category icons with color-coded borders
   * - "See all" option for accessing transaction history (not functional at thte moment)
   * 
   * Currently using mock data for demonstration purposes.
   * In a production environment, this would fetch data from the transactions store.
   */

  /** Recent Transaction Mock Data */
  const transactions = [
    {
      id: 1,
      name: 'Cold Brew',
      category: 'Food',
      categoryColor: '#213B80', // Dark blue
      amount: '$5.92',
      date: '03-30-2022'
    },
    {
      id: 2,
      name: 'Coursera',
      category: 'Education',
      categoryColor: '#46BDC6', // Teal
      amount: '$39.00',
      date: '03-12-2022'
    },
    {
      id: 3,
      name: 'Kroger',
      category: 'Groceries',
      categoryColor: '#00BC38', // Green
      amount: '$42.85',
      date: '03-10-2022'
    },
    {
      id: 4,
      name: 'T.J. Maxx',
      category: 'Shopping',
      categoryColor: '#386BBC', // Blue
      amount: '$78.45',
      date: '03-05-2022'
    }
  ];

  /** Recent Transaction icons */
  const categoryIcons = {
    Food: {
      src: "/src/assets/img/food-icon.png",
      alt:"Food category icon"
    },
    Education: {
      src: "/src/assets/img/education-icon.png",
    },
    Groceries: {
      src: "/src/assets/img/groceries-icon.png",
      alt: "Education category icon"
    },
    Shopping: {
      src: "/src/assets/img/shopping-icon.png",
      alt: "Shopping category icon"
    }
  };
</script>

<template>
  <div class="recent-transactions-container">
    <div class="transactions-header">
      <h3 class="transactions-title">Recent Transactions</h3>
      <span class="see-all">See all</span>
    </div>

    <!-- Transaction List -->
    <div class="transactions-list">
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">

        <div class="transaction-details">
          <!-- Category Icon -->
          <div class="category-icon w-[16px] h-[16px]" :style="{ borderColor: transaction.categoryColor }">
            <img 
              v-if="categoryIcons[transaction.category]" 
              :src="categoryIcons[transaction.category].src"
              :alt="categoryIcons[transaction.category].alt"
              width="17.33"
              height="16"
            />
          </div>
          
          <!-- Name & Category -->
          <div class="transaction-info">
            <span class="transaction-name">{{ transaction.name }}</span>
            <span class="transaction-category">{{ transaction.category }}</span>
          </div>
        </div>
        
        <!-- Amount & Date -->
        <div class="transaction-amount-container">
          <div class="amount-date">
            <span class="amount">{{ transaction.amount }}</span>
            <span class="date">{{ transaction.date }}</span>
          </div>

          <div class="chevron-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.41 17.59L8 16.17L12.17 12L8 7.83L9.41 6.41L15 12L9.41 17.59Z" fill="#707070"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .recent-transactions-container {
    width: 408px;
    position: relative;
  }

  .transactions-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 23px;
    margin-bottom: 10px;
  }

  .transactions-title {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    display: flex;
    align-items: flex-end;
    letter-spacing: 0.5px;
    color: #2B2B2B;
    white-space: nowrap;
  }

  .see-all {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: flex-end;
    color: #2B2B2B;
    cursor: pointer;
    white-space: nowrap;
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .transaction-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
    height: 71px;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 16px;
  }

  .transaction-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .category-icon {
    width: 32px;
    height: 32px;
    background: #F3F3F3;
    border: 3px solid; /* Color is set dynamically */
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .transaction-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }

  .transaction-name {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
    color: #2B2B2B;
    white-space: nowrap;
  }

  .transaction-category {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 130%;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
    color: #707070;
    white-space: nowrap;
  }

  .transaction-amount-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 24px;
    flex-shrink: 0;
  }

  .amount-date {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .amount {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    text-align: right;
    letter-spacing: 0.5px;
    color: #2B2B2B;
    white-space: nowrap;
  }

  .date {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    display: flex;
    align-items: center;
    text-align: right;
    color: #707070;
    white-space: nowrap; /* Prevents date from wrapping */
  }
</style>