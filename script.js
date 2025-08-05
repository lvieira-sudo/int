
        // Dados 2024
        const data2024 = {
            'Educação Infantil': {
                valorParcela: 386545.86,
                descontoBolsa: 205176.02,
                valorLiquido: 169721.96,
                valorEmAberto: 2668.48,
                valorRecAntecip: 68154.66,
                valorRecVencto: 79311.95,
                valorBolsa: 206817.10,
                valorTotalPago: 167617.47
            },
            'Ensino Fundamental Anos Finais': {
                valorParcela: 1868542.24,
                descontoBolsa: 1044717.34,
                valorLiquido: 787466.20,
                valorEmAberto: 15096.17,
                valorRecAntecip: 262326.66,
                valorRecVencto: 311601.71,
                valorBolsa: 1056656.10,
                valorTotalPago: 778989.79
            },
            'Ensino Fundamental Anos Iniciais': {
                valorParcela: 1061086.42,
                descontoBolsa: 581962.16,
                valorLiquido: 470446.27,
                valorEmAberto: 16477.86,
                valorRecAntecip: 166308.10,
                valorRecVencto: 217709.63,
                valorBolsa: 583968.95,
                valorTotalPago: 460852.70
            },
            'Ensino Médio': {
                valorParcela: 1764055.75,
                descontoBolsa: 1023896.87,
                valorLiquido: 683066.41,
                valorEmAberto: 23278.87,
                valorRecAntecip: 181713.08,
                valorRecVencto: 282281.15,
                valorBolsa: 1042668.84,
                valorTotalPago: 674593.19
            }
        };

        // Dados 2025
        const data2025 = {
            'Educação Infantil': {
                valorRecAntecip: 59825.54,
                valorRecVencto: 34885.57,
                valorRecAtraso: 66608.55,
                descontoBolsa: 215913.60,
                valorLiquido: 165943.06,
                valorParcela: 382669.92,
                valorTotalPago: 161319.66
            },
            'Ensino Fundamental Anos Finais': {
                valorRecAntecip: 209396.97,
                valorRecVencto: 182085.42,
                valorRecAtraso: 340674.95,
                descontoBolsa: 1160673.47,
                valorLiquido: 776046.49,
                valorParcela: 1939623.46,
                valorTotalPago: 732157.34
            },
            'Ensino Fundamental Anos Iniciais': {
                valorRecAntecip: 189805.67,
                valorRecVencto: 112148.84,
                valorRecAtraso: 239423.52,
                descontoBolsa: 725279.96,
                valorLiquido: 563521.99,
                valorParcela: 1291977.54,
                valorTotalPago: 541378.03
            },
            'Ensino Médio': {
                valorRecAntecip: 204585.33,
                valorRecVencto: 214654.85,
                valorRecAtraso: 272332.94,
                descontoBolsa: 1152372.59,
                valorLiquido: 782218.66,
                valorParcela: 1935807.47,
                valorTotalPago: 691573.12
            }
        };

        // Função para formatar valores em reais
        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        }

        // Função para calcular percentual
        function calculatePercentage(value1, value2) {
            return ((value2 - value1) / value1 * 100).toFixed(2);
        }

        // Configuração dos gráficos
        Chart.defaults.font.family = 'Inter';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;

        // Gráfico Overview
        const overviewCtx = document.getElementById('overviewChart').getContext('2d');
        const overviewChart = new Chart(overviewCtx, {
            type: 'bar',
            data: {
                labels: ['2024', '2025'],
                datasets: [{
                    label: 'Total Parcelas',
                    data: [
                        Object.values(data2024).reduce((sum, course) => sum + course.valorParcela, 0),
                        Object.values(data2025).reduce((sum, course) => sum + course.valorParcela, 0)
                    ],
                    backgroundColor: '#3b82f6',
                    borderRadius: 8
                }, {
                    label: 'Total Pago',
                    data: [
                        Object.values(data2024).reduce((sum, course) => sum + course.valorTotalPago, 0),
                        Object.values(data2025).reduce((sum, course) => sum + course.valorTotalPago, 0)
                    ],
                    backgroundColor: '#059669',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });

        // Gráfico de Descontos
        const discountCtx = document.getElementById('discountChart').getContext('2d');
        
        // Calcular valores dos descontos
        const discount2024 = Object.values(data2024).reduce((sum, course) => sum + course.descontoBolsa, 0);
        const discount2025 = Object.values(data2025).reduce((sum, course) => sum + course.descontoBolsa, 0);
        
        // Atualizar valores na legenda
        document.getElementById('discount2024Value').textContent = formatCurrency(discount2024);
        document.getElementById('discount2025Value').textContent = formatCurrency(discount2025);
        
        const discountChart = new Chart(discountCtx, {
            type: 'line',
            data: {
                labels: ['2024', '2025'],
                datasets: [{
                    label: 'Descontos/Bolsas',
                    data: [discount2024, discount2025],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });

        // Função para mostrar tabs
        function showTab(tabName) {
            // Esconder todas as tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remover classe active de todos os botões
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mostrar tab selecionada
            document.getElementById(tabName + '-tab').classList.remove('hidden');
            document.getElementById('tab-' + tabName).classList.add('active');
            
            // Inicializar conteúdo específico da tab
            if (tabName === 'detailed') {
                fillDetailedTables();
            } else if (tabName === 'comparison') {
                initComparisonCharts();
            } else if (tabName === 'courses') {
                initCourseCharts();
            }
        }

        // Preencher tabelas detalhadas
        function fillDetailedTables() {
            // Tabela 2024
            const tbody2024 = document.getElementById('detailed2024TableBody');
            tbody2024.innerHTML = '';
            
            Object.keys(data2024).forEach(courseName => {
                const course = data2024[courseName];
                tbody2024.innerHTML += `
                    <tr class="border-b border-gray-100">
                        <td class="py-3 px-4 font-medium">${courseName}</td>
                        <td class="py-3 px-4 text-right">${formatCurrency(course.valorParcela)}</td>
                        <td class="py-3 px-4 text-right text-red-600">${formatCurrency(course.descontoBolsa)}</td>
                        <td class="py-3 px-4 text-right text-green-600">${formatCurrency(course.valorLiquido)}</td>
                        <td class="py-3 px-4 text-right text-orange-600">${formatCurrency(course.valorEmAberto)}</td>
                        <td class="py-3 px-4 text-right text-purple-600">${formatCurrency(course.valorRecAntecip)}</td>
                        <td class="py-3 px-4 text-right text-blue-600">${formatCurrency(course.valorRecVencto)}</td>
                        <td class="py-3 px-4 text-right text-pink-600">${formatCurrency(course.valorBolsa)}</td>
                        <td class="py-3 px-4 text-right font-semibold text-green-700">${formatCurrency(course.valorTotalPago)}</td>
                    </tr>
                `;
            });

            // Tabela 2025
            const tbody2025 = document.getElementById('detailed2025TableBody');
            tbody2025.innerHTML = '';
            
            Object.keys(data2025).forEach(courseName => {
                const course = data2025[courseName];
                tbody2025.innerHTML += `
                    <tr class="border-b border-gray-100">
                        <td class="py-3 px-4 font-medium">${courseName}</td>
                        <td class="py-3 px-4 text-right">${formatCurrency(course.valorParcela)}</td>
                        <td class="py-3 px-4 text-right text-red-600">${formatCurrency(course.descontoBolsa)}</td>
                        <td class="py-3 px-4 text-right text-green-600">${formatCurrency(course.valorLiquido)}</td>
                        <td class="py-3 px-4 text-right text-purple-600">${formatCurrency(course.valorRecAntecip)}</td>
                        <td class="py-3 px-4 text-right text-blue-600">${formatCurrency(course.valorRecVencto)}</td>
                        <td class="py-3 px-4 text-right text-red-600">${formatCurrency(course.valorRecAtraso)}</td>
                        <td class="py-3 px-4 text-right font-semibold text-green-700">${formatCurrency(course.valorTotalPago)}</td>
                    </tr>
                `;
            });
        }

        // Variáveis globais para os gráficos
        let comparisonChart = null;
        let receivingChart = null;

        // Inicializar gráficos de comparação
        function initComparisonCharts() {
            updateComparison();
        }

        // Função para atualizar comparação
        function updateComparison() {
            const baseYear = document.getElementById('baseYear').value;
            const compareYear = document.getElementById('compareYear').value;
            
            // Atualizar displays
            document.getElementById('baseYearDisplay').textContent = baseYear;
            document.getElementById('compareYearDisplay').textContent = compareYear;
            
            // Atualizar headers da tabela
            document.getElementById('baseYearHeader').textContent = `${baseYear} (Base)`;
            document.getElementById('compareYearHeader').textContent = `${compareYear} (Comparação)`;
            
            // Calcular variação total
            const baseData = baseYear === '2024' ? data2024 : data2025;
            const compareData = compareYear === '2024' ? data2024 : data2025;
            
            const baseTotal = Object.values(baseData).reduce((sum, course) => sum + course.valorTotalPago, 0);
            const compareTotal = Object.values(compareData).reduce((sum, course) => sum + course.valorTotalPago, 0);
            
            const variation = calculatePercentage(baseTotal, compareTotal);
            const variationElement = document.getElementById('totalVariation');
            const iconElement = document.getElementById('variationIcon');
            
            if (variation >= 0) {
                variationElement.textContent = `+${variation}%`;
                variationElement.className = 'text-xl font-bold text-green-800';
                iconElement.textContent = '📈';
            } else {
                variationElement.textContent = `${variation}%`;
                variationElement.className = 'text-xl font-bold text-red-800';
                iconElement.textContent = '📉';
            }
            
            // Atualizar gráfico de comparação
            updateComparisonChart(baseYear, compareYear);
            
            // Atualizar gráfico de recebimento
            updateReceivingChart(baseYear, compareYear);
            
            // Atualizar tabela
            fillComparisonTable(baseYear, compareYear);
        }

        // Função para trocar anos
        function swapYears() {
            const baseYear = document.getElementById('baseYear').value;
            const compareYear = document.getElementById('compareYear').value;
            
            document.getElementById('baseYear').value = compareYear;
            document.getElementById('compareYear').value = baseYear;
            
            updateComparison();
        }

        // Atualizar gráfico de comparação
        function updateComparisonChart(baseYear, compareYear) {
            const ctx = document.getElementById('comparisonChart').getContext('2d');
            
            if (comparisonChart) {
                comparisonChart.destroy();
            }
            
            const baseData = baseYear === '2024' ? data2024 : data2025;
            const compareData = compareYear === '2024' ? data2024 : data2025;
            
            comparisonChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(baseData),
                    datasets: [{
                        label: `${baseYear} (Base)`,
                        data: Object.values(baseData).map(course => course.valorTotalPago),
                        backgroundColor: baseYear === '2024' ? '#3b82f6' : '#8b5cf6',
                        borderRadius: 8
                    }, {
                        label: `${compareYear} (Comparação)`,
                        data: Object.values(compareData).map(course => course.valorTotalPago),
                        backgroundColor: compareYear === '2024' ? '#059669' : '#10b981',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value);
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
        }

        // Atualizar gráfico de recebimento
        function updateReceivingChart(baseYear, compareYear) {
            const ctx = document.getElementById('receivingChart').getContext('2d');
            
            if (receivingChart) {
                receivingChart.destroy();
            }
            
            const baseData = baseYear === '2024' ? data2024 : data2025;
            const compareData = compareYear === '2024' ? data2024 : data2025;
            
            let labels = [];
            let chartData = [];
            let colors = [];
            
            if (baseYear === '2024') {
                labels.push(`Antecipado ${baseYear}`, `No Vencto ${baseYear}`);
                chartData.push(
                    Object.values(baseData).reduce((sum, course) => sum + course.valorRecAntecip, 0),
                    Object.values(baseData).reduce((sum, course) => sum + course.valorRecVencto, 0)
                );
                colors.push('#8b5cf6', '#06b6d4');
            } else {
                labels.push(`Antecipado ${baseYear}`, `No Vencto ${baseYear}`, `Em Atraso ${baseYear}`);
                chartData.push(
                    Object.values(baseData).reduce((sum, course) => sum + course.valorRecAntecip, 0),
                    Object.values(baseData).reduce((sum, course) => sum + course.valorRecVencto, 0),
                    Object.values(baseData).reduce((sum, course) => sum + course.valorRecAtraso, 0)
                );
                colors.push('#8b5cf6', '#06b6d4', '#ef4444');
            }
            
            if (compareYear === '2024') {
                labels.push(`Antecipado ${compareYear}`, `No Vencto ${compareYear}`);
                chartData.push(
                    Object.values(compareData).reduce((sum, course) => sum + course.valorRecAntecip, 0),
                    Object.values(compareData).reduce((sum, course) => sum + course.valorRecVencto, 0)
                );
                colors.push('#10b981', '#3b82f6');
            } else {
                labels.push(`Antecipado ${compareYear}`, `No Vencto ${compareYear}`, `Em Atraso ${compareYear}`);
                chartData.push(
                    Object.values(compareData).reduce((sum, course) => sum + course.valorRecAntecip, 0),
                    Object.values(compareData).reduce((sum, course) => sum + course.valorRecVencto, 0),
                    Object.values(compareData).reduce((sum, course) => sum + course.valorRecAtraso, 0)
                );
                colors.push('#10b981', '#3b82f6', '#dc2626');
            }
            
            receivingChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: chartData,
                        backgroundColor: colors,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + formatCurrency(context.parsed);
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
        }

        // Preencher tabela comparativa
        function fillComparisonTable(baseYear = '2024', compareYear = '2025') {
            const tbody = document.getElementById('comparisonTableBody');
            
            const baseData = baseYear === '2024' ? data2024 : data2025;
            const compareData = compareYear === '2024' ? data2024 : data2025;
            
            const metrics = [
                {
                    name: 'Total Parcelas',
                    valueBase: Object.values(baseData).reduce((sum, course) => sum + course.valorParcela, 0),
                    valueCompare: Object.values(compareData).reduce((sum, course) => sum + course.valorParcela, 0)
                },
                {
                    name: 'Total Descontos/Bolsas',
                    valueBase: Object.values(baseData).reduce((sum, course) => sum + course.descontoBolsa, 0),
                    valueCompare: Object.values(compareData).reduce((sum, course) => sum + course.descontoBolsa, 0)
                },
                {
                    name: 'Total Líquido',
                    valueBase: Object.values(baseData).reduce((sum, course) => sum + course.valorLiquido, 0),
                    valueCompare: Object.values(compareData).reduce((sum, course) => sum + course.valorLiquido, 0)
                },
                {
                    name: 'Total Pago',
                    valueBase: Object.values(baseData).reduce((sum, course) => sum + course.valorTotalPago, 0),
                    valueCompare: Object.values(compareData).reduce((sum, course) => sum + course.valorTotalPago, 0)
                }
            ];

            tbody.innerHTML = '';
            metrics.forEach(metric => {
                const variation = calculatePercentage(metric.valueBase, metric.valueCompare);
                const difference = metric.valueCompare - metric.valueBase;
                const variationClass = variation >= 0 ? 'positive' : 'negative';
                const arrow = variation >= 0 ? '↗️' : '↘️';
                
                tbody.innerHTML += `
                    <tr class="border-b border-gray-100">
                        <td class="py-3 px-4 font-medium">${metric.name}</td>
                        <td class="py-3 px-4 text-right">${formatCurrency(metric.valueBase)}</td>
                        <td class="py-3 px-4 text-right">${formatCurrency(metric.valueCompare)}</td>
                        <td class="py-3 px-4 text-right ${variationClass} font-semibold">
                            ${arrow} ${Math.abs(variation)}%
                        </td>
                        <td class="py-3 px-4 text-right ${variationClass} font-semibold">
                            ${formatCurrency(difference)}
                        </td>
                    </tr>
                `;
            });
        }

        // Inicializar gráficos por curso
        function initCourseCharts() {
            // Gráfico de Performance
            const performanceCtx = document.getElementById('performanceChart').getContext('2d');
            new Chart(performanceCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data2024),
                    datasets: [{
                        label: 'Parcelas 2024',
                        data: Object.values(data2024).map(course => course.valorParcela),
                        backgroundColor: '#3b82f6',
                        borderRadius: 6
                    }, {
                        label: 'Pago 2024',
                        data: Object.values(data2024).map(course => course.valorTotalPago),
                        backgroundColor: '#059669',
                        borderRadius: 6
                    }, {
                        label: 'Parcelas 2025',
                        data: Object.values(data2025).map(course => course.valorParcela),
                        backgroundColor: '#8b5cf6',
                        borderRadius: 6
                    }, {
                        label: 'Pago 2025',
                        data: Object.values(data2025).map(course => course.valorTotalPago),
                        backgroundColor: '#10b981',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value);
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 2000
                    }
                }
            });

            // Criar cards dos cursos
            createCourseCards();
        }

        // Criar cards detalhados dos cursos
        function createCourseCards() {
            const container = document.getElementById('courseCards');
            container.innerHTML = '';
            
            Object.keys(data2024).forEach(courseName => {
                const course2024 = data2024[courseName];
                const course2025 = data2025[courseName];
                
                container.innerHTML += `
                    <div class="detailed-metric-card rounded-xl p-6 animate-slide-up">
                        <h4 class="font-semibold text-gray-800 mb-4 text-lg">${courseName}</h4>
                        
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div class="space-y-2">
                                <h5 class="font-semibold text-blue-600">2024</h5>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Parcela:</span>
                                        <span class="font-medium">${formatCurrency(course2024.valorParcela)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Desconto:</span>
                                        <span class="font-medium text-red-600">${formatCurrency(course2024.descontoBolsa)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Líquido:</span>
                                        <span class="font-medium text-green-600">${formatCurrency(course2024.valorLiquido)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Em Aberto:</span>
                                        <span class="font-medium text-orange-600">${formatCurrency(course2024.valorEmAberto)}</span>
                                    </div>
                                    <div class="flex justify-between border-t pt-1">
                                        <span class="text-gray-600">Total Pago:</span>
                                        <span class="font-semibold text-green-700">${formatCurrency(course2024.valorTotalPago)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <h5 class="font-semibold text-purple-600">2025</h5>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Parcela:</span>
                                        <span class="font-medium">${formatCurrency(course2025.valorParcela)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Desconto:</span>
                                        <span class="font-medium text-red-600">${formatCurrency(course2025.descontoBolsa)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Líquido:</span>
                                        <span class="font-medium text-green-600">${formatCurrency(course2025.valorLiquido)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Em Atraso:</span>
                                        <span class="font-medium text-red-600">${formatCurrency(course2025.valorRecAtraso)}</span>
                                    </div>
                                    <div class="flex justify-between border-t pt-1">
                                        <span class="text-gray-600">Total Pago:</span>
                                        <span class="font-semibold text-green-700">${formatCurrency(course2025.valorTotalPago)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Variação Total Pago:</span>
                                <span class="font-semibold ${calculatePercentage(course2024.valorTotalPago, course2025.valorTotalPago) >= 0 ? 'positive' : 'negative'}">
                                    ${calculatePercentage(course2024.valorTotalPago, course2025.valorTotalPago) >= 0 ? '↗️' : '↘️'} 
                                    ${Math.abs(calculatePercentage(course2024.valorTotalPago, course2025.valorTotalPago))}%
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Inicializar dashboard
        document.addEventListener('DOMContentLoaded', function() {
            // Animações de entrada sequencial
            setTimeout(() => {
                document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 300);
        });
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'969e71bf6690d97a',t:'MTc1NDMxNDU5My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();