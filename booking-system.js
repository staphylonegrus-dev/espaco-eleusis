/**
 * Espaço Elêusis - Sistema de Agenda Autocontenida
 * Calendário local com sistema de reservas
 */

// Default configuration
const DEFAULT_CONFIG = {
    adminPassword: 'malu2024',
    slotDuration: 50,
    workingHours: { start: 9, end: 18 },
    workingDays: [1, 2, 3, 4, 5],
    showPricesInBooking: false,
    services: {
        'psicoterapia': { name: 'Psicoterapia Individual', duration: 50, price: 250, enabled: true },
        'mindfulness': { name: 'Sessão de Mindfulness', duration: 50, price: 200, enabled: true },
        'workshop': { name: 'Workshop/Vivência', duration: 120, price: 350, enabled: true }
    }
};

// Load config from localStorage or use defaults
function loadConfig() {
    const stored = localStorage.getItem('eleusis_config');
    if (stored) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
    return { ...DEFAULT_CONFIG };
}

// Current config (loaded from localStorage)
let CONFIG = loadConfig();

// Estado da aplicação
let appState = {
    currentView: 'calendar',
    selectedDate: null,
    selectedService: null,
    selectedTime: null,
    bookings: [],
    currentMonth: new Date()
};

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    loadBookings();
    initCalendar();
    setupEventListeners();
    
    // Initialize content management
    if (typeof initContentManagement === 'function') {
        initContentManagement();
    }
});

// Carregar reservas do localStorage
function loadBookings() {
    const stored = localStorage.getItem('eleusis_bookings');
    if (stored) {
        appState.bookings = JSON.parse(stored);
    }
}

// Salvar reservas no localStorage
function saveBookings() {
    localStorage.setItem('eleusis_bookings', JSON.stringify(appState.bookings));
}

// Configurar event listeners
function setupEventListeners() {
    // Calendar navigation
    document.getElementById('prev-month')?.addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month')?.addEventListener('click', () => changeMonth(1));
    
    // Booking form
    document.getElementById('booking-form')?.addEventListener('submit', handleBookingSubmit);
}

// ============ CALENDAR FUNCTIONS ============

function initCalendar() {
    renderCalendar();
}

function changeMonth(delta) {
    appState.currentMonth.setMonth(appState.currentMonth.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const month = appState.currentMonth;
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    
    // Update month display
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('current-month').textContent = `${monthNames[monthIndex]} ${year}`;
    
    // Generate calendar days
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    // Empty cells for days before first of month
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'p-2';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthIndex, day);
        const isWorkingDay = CONFIG.workingDays.includes(date.getDay());
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isToday = date.toDateString() === today.toDateString();
        
        const dayCell = document.createElement('button');
        dayCell.className = `p-2 rounded-lg text-sm transition ${!isWorkingDay || isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-olive-100 text-brown-700'} ${isToday ? 'bg-gold text-white hover:bg-gold-hover' : ''}`;
        
        if (isWorkingDay && !isPast) {
            dayCell.addEventListener('click', () => selectDate(date));
        }
        
        dayCell.innerHTML = `
            <span class="${appState.selectedDate?.toDateString() === date.toDateString() ? 'font-bold' : ''}">${day}</span>
            ${hasBookings(date) ? '<span class="block w-1.5 h-1.5 bg-olive-500 rounded-full mx-auto mt-1"></span>' : ''}
        `;
        
        calendarGrid.appendChild(dayCell);
    }
}

function selectDate(date) {
    appState.selectedDate = date;
    renderCalendar();
    showTimeSlots(date);
    document.getElementById('time-slots-container').classList.remove('hidden');
}

function showTimeSlots(date) {
    const container = document.getElementById('time-slots');
    container.innerHTML = '';
    
    const slots = generateTimeSlots(date);
    
    if (slots.length === 0) {
        container.innerHTML = '<p class="text-brown-600 text-center col-span-3">Não há horários disponíveis nesta data.</p>';
        return;
    }
    
    slots.forEach(slot => {
        const slotBtn = document.createElement('button');
        slotBtn.className = `px-4 py-2 rounded-lg text-sm transition ${slot.available ? 'bg-cream-100 hover:bg-olive-100 text-brown-700 border border-cream-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'}`;
        
        if (slot.available) {
            slotBtn.addEventListener('click', (e) => selectTimeSlot(slot, e));
        }
        
        slotBtn.textContent = slot.time;
        container.appendChild(slotBtn);
    });
}

function generateTimeSlots(date) {
    const slots = [];
    const dateStr = date.toISOString().split('T')[0];
    
    for (let hour = CONFIG.workingHours.start; hour < CONFIG.workingHours.end; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const isBooked = appState.bookings.some(b => 
            b.date === dateStr && b.time === time && b.status !== 'cancelled'
        );
        
        slots.push({
            time,
            available: !isBooked
        });
        
        // Add half hour slot
        const timeHalf = `${hour.toString().padStart(2, '0')}:30`;
        const isBookedHalf = appState.bookings.some(b => 
            b.date === dateStr && b.time === timeHalf && b.status !== 'cancelled'
        );
        
        slots.push({
            time: timeHalf,
            available: !isBookedHalf
        });
    }
    
    return slots;
}

function selectTimeSlot(slot, clickEvent) {
    appState.selectedTime = slot;
    document.querySelectorAll('#time-slots button').forEach(btn => {
        btn.classList.remove('bg-gold', 'text-white', 'border-gold');
    });
    const target = clickEvent ? clickEvent.target : event?.target;
    if (target) {
        target.classList.add('bg-gold', 'text-white', 'border-gold');
    }
    
    // Show booking form
    document.getElementById('selected-datetime').textContent = 
        `${formatDate(appState.selectedDate)} às ${slot.time}`;
    document.getElementById('booking-form-container').classList.remove('hidden');
}

function hasBookings(date) {
    const dateStr = date.toISOString().split('T')[0];
    return appState.bookings.some(b => b.date === dateStr && b.status !== 'cancelled');
}

// ============ BOOKING FUNCTIONS ============

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const booking = {
        id: Date.now().toString(),
        date: appState.selectedDate.toISOString().split('T')[0],
        time: appState.selectedTime.time,
        service: 'Não especificado',
        serviceId: form.service.value || 'none',
        clientName: form.clientName.value,
        clientEmail: form.clientEmail.value,
        clientPhone: form.clientPhone.value,
        notes: form.notes.value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    appState.bookings.push(booking);
    saveBookings();
    
    // Show success message
    document.getElementById('booking-form-container').classList.add('hidden');
    document.getElementById('booking-success').classList.remove('hidden');
    document.getElementById('booking-success').innerHTML = `
        <div class="text-center py-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="font-display text-2xl text-brown-800 mb-2">Solicitação Enviada!</h3>
            <p class="text-brown-600 mb-4">
                Sua solicitação de agendamento foi enviada para revisão.<br>
                Malu entrará em contato em breve para confirmar.
            </p>
            <p class="text-sm text-brown-500">
                Data: ${formatDate(appState.selectedDate)} às ${appState.selectedTime.time}
            </p>
        </div>
    `;
    
    // Reset form
    form.reset();
}

// ============ UTILITY FUNCTIONS ============

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, appState };
}