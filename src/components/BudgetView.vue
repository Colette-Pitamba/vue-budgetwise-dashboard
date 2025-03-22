<script setup>
  /**
   * Budget View Component
   * 
   * This component is responsible for rendering the budget categories and budget header.
   * It imports necessary child components and uses Vue's ref to bind data and references.
   *
   *  The 'budgetCategoriesRef' is a reference to the BudgetCategory.
   *  The 'refreshAllComponents' function is triggered by a 'transaction-saved' event.
   */

  import { ref } from 'vue';
  import BudgetCategories from './BudgetCategories.vue';
  import BudgetHeader from './BudgetHeader.vue';

  // Summary data
  const budgetSummary = ref({
    spent: '$800',
    spentValue: 800,
    available: '$1,200',
    availableValue: 1200,
    budget: '$2,000',
    budgetValue: 2000
  });

  const budgetCategoriesRef = ref(null);

  // Function to refresh all components
  const refreshAllComponents = () => {
    console.log("Refreshing all components from BudgetView");
    if (budgetCategoriesRef.value) {
      console.log("Refreshing BudgetCategories");
      budgetCategoriesRef.value.refreshData();
    }
  };
</script>

<template>
  <div class="budget-view">
    <BudgetHeader 
      @transaction-saved="refreshAllComponents"
    />

    <div class="budget-content">
      <BudgetCategories ref="budgetCategoriesRef" />
    </div>
  </div>
</template>

