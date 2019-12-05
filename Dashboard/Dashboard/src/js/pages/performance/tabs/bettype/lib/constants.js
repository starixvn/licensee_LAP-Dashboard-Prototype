import languageApi from '../../../../../lib/languageApi';
export const titleDistributionChart = languageApi.getDefaultRes('distribution_chart_title_bettype');
export const titleOverallMarginChart = languageApi.getDefaultRes('overall_margin_growth');

export const diffenceTableHeader = [
  [
    { name: languageApi.getDefaultRes('bettype'), rowSpan: 2 },
    ...[
     { name:  languageApi.getDefaultRes('turnover'), colSpan: 2 },
     { name:  languageApi.getDefaultRes('gross_profit'), colSpan: 2 },
     { name: `${languageApi.getDefaultRes('margin')} %`, rowSpan: 2 },
   ]
 ],
 [
   { name: '%' },
   { name: languageApi.getDefaultRes('value') },
   { name: '%' },
   { name: languageApi.getDefaultRes('value') },
 ]
];
