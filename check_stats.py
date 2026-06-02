import json

data = json.load(open('CLIENTES_QUENTES_VERSATIL.json', 'r', encoding='utf-8'))

print(f"Total: {len(data)}")
a1 = [c for c in data if c['classe_comercial'] == 'A1']
a2 = [c for c in data if c['classe_comercial'] == 'A2']
b1 = [c for c in data if c['classe_comercial'] == 'B1']
b2 = [c for c in data if c['classe_comercial'] == 'B2']
print(f"A1: {len(a1)}, A2: {len(a2)}, B1: {len(b1)}, B2: {len(b2)}")

alto = [c for c in data if c['nivel_confianca'] == 'alto']
medio = [c for c in data if c['nivel_confianca'] == 'medio']
baixo = [c for c in data if c['nivel_confianca'] == 'baixo']
print(f"Confiança Alto: {len(alto)}, Medio: {len(medio)}, Baixo: {len(baixo)}")

print("\n--- TOP 15 PRIORIDADE (Topo do Pipeline) ---")
for c in data[:15]:
    print(f"  {c['id_cliente']} | {c['nome_empresa'][:35]:35} | {c['classe_comercial']} | {c['nivel_confianca']:6} | site: {c['site_oficial'][:30]} | email: {c['email_corporativo'][:35]}")

print("\n--- VERIFICAÇÃO TRANSPETRO PECÉM (0120) ---")
t120 = [c for c in data if c['id_cliente'] == '0120']
if t120:
    t = t120[0]
    print(f"  cliente_final: {t['cliente_final']}")
    print(f"  empresa_emissora: {t['empresa_emissora']}")
    print(f"  empresa_parceira: {t['empresa_parceira']}")
    print(f"  site_oficial: {t['site_oficial']}")
    print(f"  email_corporativo: {t['email_corporativo']}")
    print(f"  responsavel_manutencao: {t['responsavel_manutencao']}")
    print(f"  emails_tecnicos: {t['emails_tecnicos'][:3]}")
