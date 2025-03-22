<script setup>
  /**
   * Add Transaction Form
   * 
   * This component handles the form for adding a new transaction to a transaction list.
   * It includes input fields for: category, description, amount, date, and merchant.
   * 
   * Key Features:
   * - Category selection with icons
   * - Currency formatting for amount input
   * - Input validation
   * - Emitting save and close events
   * 
   */

  import { ref, computed } from 'vue';
  import transactionsStore, { categories, categoryIcons } from '../stores/transactions';

  const emit = defineEmits(['close', 'save']);

  // Form data
  const transaction = ref({
    category: '',
    description: '',
    amount: '',
    date: formatDateForInput(new Date()),
    merchant: ''
  });

  // Validation
  const errors = ref({
    category: '',
    description: '',
    amount: '',
    date: '',
    merchant: ''
  });

  const showCategoryDropdown = ref(false);

  // Format date for input field (YYYY-MM-DD format for input type="date")
  function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Helper function to format date for display (MM-DD-YYYY)
  function formatDateForDisplay(dateStr) {
    const d = new Date(dateStr);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();

    return `${month}-${day}-${year}`;
  }

  const getCategory = (id) => {
    return categories.find(cat => cat.id === id);
  };

  const getIconData = (iconName) => {
    const key = iconName?.toLowerCase();

    return categoryIcons[key] || {
      src: "/src/assets/img/misc-icon-white.png",
      alt: "Category icon"
    };
  };

  const selectedCategory = computed(() => {
    if (!transaction.value.category) return null;
    return getCategory(transaction.value.category);
  });

  const toggleCategoryDropdown = () => {
    showCategoryDropdown.value = !showCategoryDropdown.value;
  };

  const selectCategory = (categoryId) => {
    transaction.value.category = categoryId;

    showCategoryDropdown.value = false;

    errors.value.category = '';
  };


  const formatCurrency = (value) => {
    if (!value) return '';

    return '$' + parseFloat(value).toFixed(2);
  };

  const handleAmountInput = (e) => {
    // Remove any non-digit characters except period
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const decimalPoints = value.match(/\./g) || [];

    if (decimalPoints.length > 1) {
      value = value.replace(/\.(?=.*\.)/g, '');
    }
    
    // Limit to two decimal places
    const decimalSections = value.split('.');

    if (decimalSections[1] && decimalSections[1].length > 2) {
      decimalSections[1] = decimalSections[1].substring(0, 2);
      value = decimalSections.join('.');
    }
    
    transaction.value.amount = value;
  };

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    errors.value = {
      category: '',
      description: '',
      amount: '',
      date: '',
      merchant: ''
    };
    
    if (!transaction.value.category) {
      errors.value.category = 'Please select a category';

      isValid = false;
    }
    
    if (!transaction.value.description.trim()) {
      errors.value.description = 'Please enter a description';

      isValid = false;
    }
    
    if (!transaction.value.amount || parseFloat(transaction.value.amount) <= 0) {
      errors.value.amount = 'Please enter a valid amount';

      isValid = false;
    }
    
    if (!transaction.value.date) {
      errors.value.date = 'Please select a date';

      isValid = false;
    }
    
    if (!transaction.value.merchant.trim()) {
      errors.value.merchant = 'Please enter a merchant name';

      isValid = false;
    }
    
    return isValid;
  };

  const submitForm = () => {
    if (!validateForm()) return;
    
    const transactionData = {
      ...transaction.value,
      amount: parseFloat(transaction.value.amount)
    };
    
    console.log("Submitting transaction:", transactionData);
    
    // Add the transaction to the store
    const result = transactionsStore.addTransaction(transactionData);
    
    console.log("Result from store:", result);
    
    if (result) {
      emit('save', {
        ...result,
        formattedDate: formatDateForDisplay(transaction.value.date),
        formattedAmount: formatCurrency(transaction.value.amount)
      });
      
      // Reset form
      transaction.value = {
        category: '',
        description: '',
        amount: '',
        date: formatDateForInput(new Date()),
        merchant: ''
      };
    }
  };

  // Close the modal
  const closeModal = () => {
    emit('close');
  };
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-[480px] max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 class="text-[20px] font-semibold text-[#2B2B2B]">Add Transaction</h2>

        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Form -->
      <div class="p-6">
        <form @submit.prevent="submitForm">
          <!-- Category Field -->
          <div class="mb-5">
            <label class="block text-[14px] font-medium text-gray-700 mb-2">Category</label>
            <div class="relative">
              <button 
                type="button"
                @click="toggleCategoryDropdown" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div 
                    v-if="selectedCategory" 
                    class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    :style="{ backgroundColor: selectedCategory.iconBg }"
                  >
                    <img 
                      :src="getIconData(selectedCategory.icon).src" 
                      :alt="getIconData(selectedCategory.icon).alt"
                      class="w-4 h-4" 
                    />
                  </div>
                  <span v-if="selectedCategory">{{ selectedCategory.name }}</span>
                  <span v-else class="text-gray-500">Select a category</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.175 7.158L10 10.975L13.825 7.158L15 8.333L10 13.333L5 8.333L6.175 7.158Z" fill="#4C83D8"/>
                </svg>
              </button>
              
              <!-- Category Dropdown -->
              <div 
                v-if="showCategoryDropdown" 
                class="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto"
              >
                <button 
                  v-for="category in categories" 
                  :key="category.id"
                  type="button"
                  @click="selectCategory(category.id)" 
                  class="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                >
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    :style="{ backgroundColor: category.iconBg }"
                  >
                    <img 
                      :src="getIconData(category.icon).src" 
                      :alt="getIconData(category.icon).alt"
                      class="w-4 h-4" 
                    />
                  </div>
                  <span class="font-medium">{{ category.name }}</span>
                </button>
              </div>
            </div>
            <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
          </div>
          
          <!-- Description Field -->
          <div class="mb-5">
            <label for="description" class="block text-[14px] font-medium text-gray-700 mb-2">Description</label>
            <input 
              type="text" 
              id="description" 
              v-model="transaction.description" 
              class="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4C83D8] focus:border-transparent"
              placeholder="e.g. Coffee, Lunch, Movie ticket"
            />
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>
          
          <!-- Amount Field -->
          <div class="mb-5">
            <label for="amount" class="block text-[14px] font-medium text-gray-700 mb-2">Amount</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input 
                type="text" 
                id="amount" 
                :value="transaction.amount" 
                @input="handleAmountInput"
                class="pl-7 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4C83D8] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
          </div>
          
          <!-- Date Field -->
          <div class="mb-5">
            <label for="date" class="block text-[14px] font-medium text-gray-700 mb-2">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="transaction.date" 
              class="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4C83D8] focus:border-transparent"
            />
            <p v-if="errors.date" class="mt-1 text-sm text-red-600">{{ errors.date }}</p>
          </div>
          
          <!-- Merchant Field -->
          <div class="mb-5">
            <label for="merchant" class="block text-[14px] font-medium text-gray-700 mb-2">Merchant</label>
            <input 
              type="text" 
              id="merchant" 
              v-model="transaction.merchant" 
              class="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4C83D8] focus:border-transparent"
              placeholder="e.g. In-N-Out, Amazon, Netflix"
            />
            <p v-if="errors.merchant" class="mt-1 text-sm text-red-600">{{ errors.merchant }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 mt-8">
            <button 
              type="button"
              @click="closeModal" 
              class="px-5 py-2 border border-gray-300 rounded-lg text-[#2B2B2B] font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-5 py-2 bg-[#4C83D8] rounded-lg text-white font-medium"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: transparent;
    cursor: pointer;
  }
</style>
