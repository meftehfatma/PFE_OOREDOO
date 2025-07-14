import os
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from connect import handle_question  # ton module IA

@csrf_exempt
def ask_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            question = data.get("question", "")
            result = handle_question(question)
            return JsonResponse({"answer": result})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

def react_app_view(request):
    index_path = "/media/fatma/647c2ba2-2142-4259-a840-e8f23a1fedad/pfe/front-end/build/index.html"
    try:
        print("✅ Chargement de React depuis :", index_path)
        with open(index_path, encoding="utf-8") as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        print("❌ Fichier index.html introuvable")
        return HttpResponse(
            "React build non trouvé. Lancez `npm run build` dans le dossier front-end.",
            status=501,
        )
    except Exception as e:
        print("❌ ERREUR DANS REACT_APP_VIEW :", str(e))
        return HttpResponse(f"Erreur serveur : {str(e)}", status=500)

