import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new content for Services (based on admin-content.js)
services_html = """
            <div id="services-container" class="grid md:grid-cols-3 gap-8">
                <!-- Psicoterapia Individual -->
                <div class="service-card bg-cream-50 p-8 rounded-2xl border border-cream-200">
                    <h3 class="font-display text-2xl text-brown-800 mb-4">Psicoterapia Individual</h3>
                    <p class="text-brown-700 mb-6">Atendimento online e presencial. Foco em adultos e saúde mental da mulher.</p>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Abordagem Junguiana</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Saúde mental da mulher</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Gestação e pós-parto</span>
                        </li>
                    </ul>
                </div>
                <!-- Mindfulness -->
                <div class="service-card bg-cream-50 p-8 rounded-2xl border border-cream-200">
                    <h3 class="font-display text-2xl text-brown-800 mb-4">Mindfulness (Atenção Plena)</h3>
                    <p class="text-brown-700 mb-6">Protocolo MBHP para redução de estresse e ansiedade, desarrollado na UNIFESP.</p>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Redução de estresse</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Controle de ansiedade</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Protocolo MBHP/UNIFESP</span>
                        </li>
                    </ul>
                </div>
                <!-- Workshops -->
                <div class="service-card bg-cream-50 p-8 rounded-2xl border border-cream-200">
                    <h3 class="font-display text-2xl text-brown-800 mb-4">Workshops e Vivências</h3>
                    <p class="text-brown-700 mb-6">Vivências transformadoras para autoconhecimento e desenvolvimento pessoal.</p>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Jornada das Heroínas</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Cursos especializados</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm text-brown-600">
                            <span class="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                            <span>Retiros espirituais</span>
                        </li>
                    </ul>
                </div>
            </div>
"""

# Replace the dynamic container in index.html
content = re.sub(r'<div id="services-container" class="grid md:grid-cols-3 gap-8">.*?</div>', services_html, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
