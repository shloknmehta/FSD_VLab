import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vlab_core.settings')
django.setup()

from rest_framework.test import APIClient
client = APIClient()

print("=== VERIFYING CN API ENDPOINTS ===")

# 1. List
resp = client.get('/api/experiments/list/?subject=CN')
assert resp.status_code == 200
assert len(resp.data) == 1
print(f"[PASS] List CN returned {len(resp.data)} experiment.")

# 2. Detail and Quizzes
for exp in resp.data:
    slug = exp['slug']
    det = client.get(f'/api/experiments/details/?slug={slug}')
    assert det.status_code == 200
    pre = client.get(f'/api/experiments/quiz/?slug={slug}&type=PRETEST')
    post = client.get(f'/api/experiments/quiz/?slug={slug}&type=POSTTEST')
    assert pre.status_code == 200 and len(pre.data['questions']) == 5
    assert post.status_code == 200 and len(post.data['questions']) == 5
    print(f"[PASS] {exp['title']} - Pretest: 5, Posttest: 5")

print("=== ALL CN VERIFICATIONS SUCCESSFUL ===")
