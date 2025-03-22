<script setup>
  /**
   * Budget Categories Component
   * 
   * This component provides a detailed breakdown of budget categories, 
   * allowing users to track their expenses efficiently. Each category 
   * includes:
   * 
   * - An icon representing the category.
   * - The budgeted amount.
   * - The amount spent so far.
   * - The remaining balance.
   * - A progress bar to visualize spending progress.
   * 
   * Features:
   * - Dynamically updates based on transactions.
   * - Highlights over-budget categories.
   * - Uses color indicators to differentiate financial status.
   */

  import { ref } from 'vue';
  import ProgressBar from './ProgressBar.vue';
  import transactionsStore, { categories as storeCategories, categoryIcons } from '../stores/transactions';

  // Budget categories data - initialized with data from Figma
  const categories = ref([
    {
      id: 1,
      name: 'Education',
      icon: 'education',
      iconBg: '#46BDC6',
      spent: '$40.00',
      spentValue: 40,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$60.00',
      availableValue: 60,
      progressPercentage: 25,
    },
    {
      id: 2,
      name: 'Entertainment',
      icon: 'entertainment',
      iconBg: '#FF8301',
      spent: '$60.00',
      spentValue: 60,
      spentColor: '#FE5C5C',
      budgeted: '$50.00',
      budgetedValue: 50,
      available: '$0.00',
      availableValue: 0,
      progressPercentage: 45,
    },
    {
      id: 3,
      name: 'Food',
      icon: 'food',
      iconBg: '#213B80',
      spent: '$160.00',
      spentValue: 160,
      spentColor: '#FE5C5C',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$0.00',
      availableValue: 0,
      progressPercentage: 100,
    },
    {
      id: 4,
      name: 'Groceries',
      icon: 'groceries',
      iconBg: '#00BC38',
      spent: '$50.00',
      spentValue: 50,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$50.00',
      availableValue: 50,
      progressPercentage: 50,
    },
    {
      id: 5,
      name: 'Healthcare',
      icon: 'healthcare',
      iconBg: '#AD3B9B',
      spent: '$100.00',
      spentValue: 100,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$0.00',
      availableValue: 0,
      progressPercentage: 100,
    },
    {
      id: 6,
      name: 'Housing',
      icon: 'housing',
      iconBg: '#FF373C',
      spent: '$30.00',
      spentValue: 30,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$70.00',
      availableValue: 70,
      progressPercentage: 30,
    },
    {
      id: 7,
      name: 'Miscellaneous',
      icon: 'miscellaneous',
      iconBg: '#B0866D',
      spent: '$1,750.00',
      spentValue: 1750,
      spentColor: '#53BD71',
      budgeted: '$1,750.00',
      budgetedValue: 1750,
      available: '$0.00',
      availableValue: 0,
      progressPercentage: 100,
    },
    {
      id: 8,
      name: 'Office',
      icon: 'office',
      iconBg: '#E4759D',
      spent: '$0.00',
      spentValue: 0,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$100.00',
      availableValue: 100,
      progressPercentage: 0,
    },
    {
      id: 9,
      name: 'Pets',
      icon: 'pets',
      iconBg: '#783F05',
      spent: '$50.00',
      spentValue: 50,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$50.00',
      availableValue: 50,
      progressPercentage: 50,
    },
    {
      id: 10,
      name: 'Shopping',
      icon: 'shopping',
      iconBg: '#386BBC',
      spent: '$50.00',
      spentValue: 50,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$50.00',
      availableValue: 50,
      progressPercentage: 50,
    },
    {
      id: 11,
      name: 'Subscriptions',
      icon: 'subscriptions',
      iconBg: '#4F7F88',
      spent: '$25.00',
      spentValue: 25,
      spentColor: '#53BD71',
      budgeted: '$50.00',
      budgetedValue: 50,
      available: '$25.00',
      availableValue: 25,
      progressPercentage: 50,
    },
    {
      id: 12,
      name: 'Transportation',
      icon: 'transportation',
      iconBg: '#FFB900',
      spent: '$80.00',
      spentValue: 80,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$20.00',
      availableValue: 20,
      progressPercentage: 80,
    },
    {
      id: 13,
      name: 'Travel',
      icon: 'travel',
      iconBg: '#8E7CC3',
      spent: '$75.00',
      spentValue: 75,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$25.00',
      availableValue: 25,
      progressPercentage: 75,
    },
    {
      id: 14,
      name: 'Utilities',
      icon: 'utilities',
      iconBg: '#009EDF',
      spent: '$50.00',
      spentValue: 50,
      spentColor: '#53BD71',
      budgeted: '$100.00',
      budgetedValue: 100,
      available: '$50.00',
      availableValue: 50,
      progressPercentage: 50,
    }
  ]);

  const hasLoadedFromStore = ref(false);

  // Format currency amount
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getIconData = (iconName) => {
    const categoryIconKey = iconName.toLowerCase();

    return categoryIcons[categoryIconKey] || {
      src: "/src/assets/img/misc-icon-white.png",
      alt: "Miscellaneous category icon"
    };
  };

  // Check if the available amount is below threshold for highlighting
  const getAvailableClass = (category) => {
    if (category.availableValue <= 0) {
      return 'text-muted-negative';
    }

    return;
  };

  const getSpentColorClass = (category) => {
    if (category.spentValue > category.budgetedValue) {
      return 'text-over-budget'; // Over budget
    }
    return 'text-within-budget'; // Under budget
  };

  // Get the current month and year
  const getCurrentMonthYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return { year, month };
  };

  const loadTransactionData = () => {
    const transactions = transactionsStore.getAllTransactions();
    
    // Skip update if no transactions yet
    if (!transactions || transactions.length === 0) {
      return;
    }
    
    hasLoadedFromStore.value = true;
    console.log("All transactions:", transactions);
    
    const spentByCategory = {};
    
    transactions.forEach(transaction => {
      if (!spentByCategory[transaction.category]) {
        spentByCategory[transaction.category] = 0;
      }
      
      // Store already applies the 20x multiplier, so we need to divide by 20
      // to get the actual dollar amount
      const realAmount = transaction.amount / 20;
      spentByCategory[transaction.category] += realAmount;
      
      console.log(`Added ${realAmount} to ${transaction.category}. New total: ${spentByCategory[transaction.category]}`);
    });
    
    console.log("Spent by category:", spentByCategory);
    
    // Update category data with transaction amounts
    categories.value = categories.value.map(category => {
      // Use the store data if available, otherwise keep existing
      const spentValue = spentByCategory[category.name] !== undefined 
        ? spentByCategory[category.name] 
        : category.spentValue;
        
      const availableValue = category.budgetedValue - spentValue;
      
      // Calculate progress percentage
      const progressPercentage = Math.min(
        Math.round((spentValue / category.budgetedValue) * 100),
        100
      );
      
      return {
        ...category,
        spent: formatCurrency(spentValue),
        spentValue: spentValue,
        spentColor: spentValue > category.budgetedValue ? '#FE5C5C' : '#53BD71',
        available: formatCurrency(availableValue),
        availableValue: availableValue,
        progressPercentage: progressPercentage
      };
    });
  };


  const refreshData = () => {
    loadTransactionData();
  };

  // Expose the refresh method to parent components
  defineExpose({ refreshData });
</script>

<template>
  <div class="budget-categories">
    <!-- Headers -->
    <div class="flex mb-[12px]">
      <div class="title w-[219px]">Categories</div>
      <div class="title w-[80px] ml-[60px]">Spent</div>
      <div class="title w-[80px] ml-[60px]">Budgeted</div>
      <div class="title w-[80px] ml-[60px]">Available</div>
    </div>

    <!-- Category rows -->
    <div class="space-y-6">
      <div v-for="category in categories" :key="category.id" class="flex items-center">
        <!-- Category with icon and progress bar -->
        <div class="category-container w-[219px] h-[48px] relative">
          <div class="icon-wrapper absolute left-0 top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full flex items-center justify-center" 
            :style="{ backgroundColor: category.iconBg }">
            <div class="w-[17.45px] h-[17.45px] flex items-center justify-center">
              <img
                :src="getIconData(category.icon).src"
                :alt="getIconData(category.icon).alt"
                class="w-full h-full"
              />
            </div>
          </div>
          
          <!-- Category name -->
          <div class="absolute left-[48px] top-[4px]">
            <span class="category-name">{{ category.name }}</span>
          </div>
          
          <!-- Progress bar -->
          <div class="absolute left-[48px] bottom-[8px] w-[171px] mt-[9px]">
            <ProgressBar 
              :spent="category.spentValue" 
              :budgeted="category.budgetedValue" 
              :category="category.name" 
            />
          </div>
        </div>

        <!-- Spent amount -->
        <div class="spent-container ml-[60px] w-[80px] flex items-center">
          <div :class="['spent-amount', getSpentColorClass(category)]">
            {{ category.spent }}
          </div>
        </div>

        <!-- Budgeted amount -->
        <div class="budgeted-container ml-[60px] w-[80px] flex items-center">
          <div class="budgeted-amount">
            {{ category.budgeted }}
          </div>
        </div>

        <!-- Available amount -->
        <div class="available-container ml-[60px] w-[80px] flex items-center">
          <div :class="['available-amount rounded-[56px] py-[7px] px-[10px] flex justify-center items-center', getAvailableClass(category)]">
            {{ category.available }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .budget-categories {
    width: 100%;
    max-width: 700px;
    margin-left: 36px;
  }

  .category-name, .spent-amount, .budgeted-amount, .available-amount {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: 0.5px;
    color: #2B2B2B;
  }

  .title {
    font-family: 'Outfit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    letter-spacing: 0.5px;
    color: #2B2B2B;
  }

  .available-amount {
    width: 80px;
    height: 35px;
    background: #F3F3F3;
  }

  /** Move colors to a CONST */
  .text-muted-negative {
    color: #707070;
  }

  .text-over-budget {
    color: #FE5C5C;
  }

  .text-within-budget {
    color: #53BD71;
  }
</style>