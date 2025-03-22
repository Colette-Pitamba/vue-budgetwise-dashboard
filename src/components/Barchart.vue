<script setup>
  /**
   * Monthly Snapshot Chart Component
   * 
   * This component displays a stacked bar chart showing spending by category over a 6-month period.
   * 
   * Features:
   * - Stacked bar visualization
   * - Color-coded segments for different spending categories
   * - Interactive tooltips showing spending amounts on hover
   * - Legend for category identification
   * 
   * The component takes mock transaction data and processes it into visual heights,
   * using a scale factor of 0.05 (20 dollars = 1 pixel) for appropriate display.
   */

  import { ref, computed } from 'vue';

  // API data structure based on bar height specs
  const apiData = [
    // March data
    { date: "2024-03-15", category: "Utilities", amount: 920 },
    { date: "2024-03-20", category: "Housing", amount: 380 },
    { date: "2024-03-22", category: "Entertainment", amount: 240 },
    { date: "2024-03-25", category: "Transportation", amount: 380 },
    { date: "2024-03-27", category: "Food", amount: 100 },
    { date: "2024-03-29", category: "Other", amount: 460 },
    
    // April data
    { date: "2024-04-12", category: "Utilities", amount: 1020 },
    { date: "2024-04-15", category: "Housing", amount: 260 },
    { date: "2024-04-18", category: "Entertainment", amount: 180 },
    { date: "2024-04-22", category: "Transportation", amount: 80 },
    { date: "2024-04-25", category: "Food", amount: 100 },
    { date: "2024-04-28", category: "Other", amount: 340 },
    
    // May data
    { date: "2024-05-10", category: "Utilities", amount: 1160 },
    { date: "2024-05-14", category: "Housing", amount: 380 },
    { date: "2024-05-16", category: "Entertainment", amount: 560 },
    { date: "2024-05-20", category: "Transportation", amount: 380 },
    { date: "2024-05-24", category: "Food", amount: 80 },
    { date: "2024-05-28", category: "Other", amount: 440 },
    
    // June data
    { date: "2024-06-08", category: "Utilities", amount: 1440 },
    { date: "2024-06-12", category: "Housing", amount: 360 },
    { date: "2024-06-15", category: "Entertainment", amount: 560 },
    { date: "2024-06-18", category: "Transportation", amount: 360 },
    { date: "2024-06-22", category: "Food", amount: 180 },
    { date: "2024-06-28", category: "Other", amount: 440 },
    
    // July data
    { date: "2024-07-05", category: "Utilities", amount: 1300 },
    { date: "2024-07-10", category: "Housing", amount: 360 },
    { date: "2024-07-15", category: "Entertainment", amount: 340 },
    { date: "2024-07-18", category: "Transportation", amount: 360 },
    { date: "2024-07-22", category: "Food", amount: 180 },
    { date: "2024-07-28", category: "Other", amount: 440 },
    
    // August data
    { date: "2024-08-05", category: "Utilities", amount: 820 },
    { date: "2024-08-10", category: "Housing", amount: 160 },
    { date: "2024-08-15", category: "Entertainment", amount: 180 },
    { date: "2024-08-20", category: "Transportation", amount: 180 },
    { date: "2024-08-25", category: "Food", amount: 120 },
    { date: "2024-08-28", category: "Other", amount: 200 }
  ];

  // Convert numeric months to month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Colors for each category
  const categoryColors = {
    'Housing': '#FF373C', // Red
    'Utilities': '#009EDF', // Blue
    'Entertainment': '#FF8301', // Orange
    'Transportation': '#FFB900', // Yellow
    'Food': '#213B80', // Dark blue/purple
    'Other': '#984F88'  // Purple
  };

  // Category order for display
  const categoryOrder = ['Utilities', 'Housing', 'Entertainment', 'Transportation', 'Food', 'Other'];

  // Scale factor to convert dollar amounts to pixel heights
  // This ensures the chart displays at the correct height
  const scaleFactor = 0.05; // 20 dollars = 1 pixel

  // Process data into format for the chart
  const chartDataByMonth = computed(() => {
    const groupedByMonth = {};
    
    apiData.forEach(item => {
      const month = parseInt(item.date.split('-')[1]);
      const monthName = monthNames[month - 1]; // Convert month number to name
      
      if (!groupedByMonth[monthName]) {
        groupedByMonth[monthName] = {};
        // Initialize all categories to 0
        categoryOrder.forEach(cat => {
          groupedByMonth[monthName][cat] = 0;
        });
      }
      
      // Add amount to the corresponding category
      groupedByMonth[monthName][item.category] += item.amount;
    });
    
    // Convert to pixel heights
    const pixelHeights = {};

    Object.keys(groupedByMonth).forEach(month => {
      pixelHeights[month] = {};
    
      Object.keys(groupedByMonth[month]).forEach(category => {
        pixelHeights[month][category] = Math.round(groupedByMonth[month][category] * scaleFactor);
      });
    });
    console.log(pixelHeights);
    // Get only the last 6 months
    const months = Object.keys(pixelHeights).sort((a, b) => 
      monthNames.indexOf(a) - monthNames.indexOf(b)
    ).slice(-6);

    console.log(months);
    
    const result = {};

    months.forEach(month => {
      result[month] = pixelHeights[month];
    });
    
    return result;
  });

  // Track tooltip state
  const showTooltip = ref(false);
  const tooltipMonth = ref('');
  const tooltipCategory = ref('');
  const tooltipAmount = ref('');
  const tooltipX = ref(0);
  const tooltipY = ref(0);

  const displayTooltip = (event, month, category) => {
    tooltipMonth.value = month;
    tooltipCategory.value = category;
    
    // Get original amount from apiData
    const originalAmount = apiData.find(item => {
      const itemMonth = monthNames[parseInt(item.date.split('-')[1]) - 1];
      return itemMonth === month && item.category === category;
    });
    
    tooltipAmount.value = originalAmount ? originalAmount.amount : 0;
    
    // Position tooltip near the mouse but ensure it stays within the chart area
    const rect = event.target.getBoundingClientRect();
    const chartContainer = document.querySelector('.chart-container').getBoundingClientRect();
    
    tooltipX.value = rect.left - chartContainer.left + rect.width/2;
    tooltipY.value = rect.top - chartContainer.top - 10;
    
    showTooltip.value = true;
  };

  const hideTooltip = () => {
    showTooltip.value = false;
  };
</script>

<template>
  <div class="chart-wrapper">
    <!-- 3k threshold line -->
    <div class="grid-line-container grid-line-3k">
      <svg width="306" height="1" viewBox="0 0 306 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.801575" y1="0.8187" x2="305.802" y2="0.8187" stroke="#C9CCEC" stroke-width="0.362599"/>
      </svg>
      <span class="grid-label">3k</span>
    </div>
    
    <!-- 2K budget line -->
    <div class="budget-line-container">
      <svg class="budget-line" width="250" height="38" viewBox="0 0 250 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 37H44.7653L61.7691 1H250" stroke="#C9CCEC" stroke-width="1.4504" stroke-dasharray="1.45 1.45"/>
      </svg>

      <span class="budget-label">2K Budget</span>
    </div>
    
    <!-- 1.5k threshold line -->
    <div class="grid-line-container grid-line-1-5k">
      <svg width="303" height="1" viewBox="0 0 303 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.801575" y1="0.8187" x2="302.802" y2="0.8187" stroke="#C9CCEC" stroke-width="0.362599"/>
      </svg>
      <span class="grid-label">1.5k</span>
    </div>

    <div class="chart-container">
      <div class="bar-chart">
        <div 
          v-for="(month, index) in Object.keys(chartDataByMonth)" 
          :key="month" 
          class="bar-column"
        >
          <div class="bar-stack">
            <div 
              v-for="category in categoryOrder" 
              :key="category"
              class="bar-segment"
              :style="{
                height: chartDataByMonth[month][category] + 'px',
                backgroundColor: categoryColors[category]
              }"
              @mouseover="displayTooltip($event, month, category)"
              @mouseleave="hideTooltip"
            ></div>
          </div>

          <div :class="`month-label ${index === Object.keys(chartDataByMonth).length - 1 ? 'month-label-last' : ''}`">{{ month }}</div>
        </div>
      </div>
      
      <!-- Tooltip -->
      <div 
        class="tooltip" 
        v-if="showTooltip" 
        :style="{
          left: tooltipX + 'px',
          top: tooltipY + 'px'
        }"
      >
        <div class="tooltip-content">
          <div class="tooltip-title">{{ tooltipCategory }}</div>
          <div class="tooltip-value">${{ tooltipAmount }}</div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="chart-legend mt-[16px]">
        <div class="legend-row">
          <div 
            v-for="category in ['Housing', 'Utilities', 'Entertainment']" 
            :key="category" 
            class="legend-item"
          >
            <span 
              class="legend-color" 
              :style="{ backgroundColor: categoryColors[category] }"
            ></span>
            <span class="legend-label">{{ category }}</span>
          </div>
        </div>

        <div class="legend-row">
          <div 
            v-for="category in ['Transportation', 'Food', 'Other']" 
            :key="category" 
            class="legend-item"
          >
            <span 
              class="legend-color" 
              :style="{ backgroundColor: categoryColors[category] }"
            ></span>
            <span class="legend-label">{{ category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chart-wrapper {
    width: 408px;
    height: 329.4px;
    padding: 24px 32px;
    border-radius: 16px;
    border: 1px solid #DDDDDD;
    position: relative;
  }

  .chart-container {
    width: 320px;
    height: 281.4px;
    position: relative;
    margin: 0 auto;
  }

  /* Grid Lines */
  .grid-line-container {
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
  }

  .grid-line-3k {
    top: 30px;
  }

  .grid-line-1-5k {
    top: 124px;
  }

  .grid-label {
    position: absolute;
    font-size: 10px;
    color: #6c757d;
    left: -25px;
    top: -5px;
  }

  /* Budget Line */
  .budget-line-container {
    position: absolute;
    width: 250px;
    height: 50.6px;
    left: 105px;
    top: 38.4px;
    z-index: 1;
  }

  .budget-line {
    position: absolute;
    width: 250px;
    height: 36px;
    left: 0;
    top: 14.6px /* 53px - 38.4px = 14.6px offset */
  }

  .budget-label {
    position: absolute;
    width: 58px;
    height: 11px;
    right: 0;
    top: 0;
    font-family: 'Avenir Next', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 130%;
    text-align: right;
    color: #4C83D8;
  }

  /* Bar Chart */
  .bar-chart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 2;
    gap: 23.21px;
    margin-top: 41px;
  }

  .bar-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 23px;
  }

  .bar-stack {
    display: flex;
    flex-direction: column-reverse;
    width: 23px;
  }

  .bar-segment {
    width: 100%;
    transition: opacity 0.2s;
  }

  .bar-segment:hover {
    opacity: 0.8;
  }

  .month-label {
    font-family: 'montserrat', sans-serif;
    font-weight: 400;
    font-size: 8.7px;
    line-height: 10.44px;
    letter-spacing: -0.36px;
    margin-top: 4px;
    font-size: 8.7px;
    color: #838BD3;
  }

 .month-label-last {
    width: 23px;
    height: 14px;
    color: #FFFFFF;
    background-color: #4C83D8;
    padding: 1.45px 2.9px;
    border-radius: 4px;
  }

  /* Tooltip */
  .tooltip {
    position: absolute;
    z-index: 10;
    transform: translate(-50%, -100%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(0, 0, 0, 0.8);
  }

  .tooltip-title {
    font-weight: 500;
  }

  .tooltip-value {
    text-align: center;
  }

  /* Legend */
  .chart-legend {
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5.4px;
  }

  .legend-row {
    display: flex;
    gap: 15px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 300;
  }

  .legend-color {
    display: inline-block;
    width: 6.4px;
    height: 6.4px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .legend-label {
    font-weight: 300;
    font-size: 13px;
    line-height: 130%;
    white-space: nowrap;
  }
</style>




