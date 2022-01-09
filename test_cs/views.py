from django.shortcuts import render
from django.http import HttpResponse
from test_cs.forms import UserForm
from django.conf import settings
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
import datetime
import json
from .models import CPU_usage
from django.db.models import Min,Max,Avg
#from django.contrib.staticfiles import finders

def handler404(request, *args, **argv):
    response = render_to_response('NotFound.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response
def handler500(request, *args, **argv):
    response = render_to_response('Error.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response

@csrf_exempt
def index(request):
    
    result={}

    if request.method == 'GET': 
        #path = finders.find('script/main.js')
        #print ('path=',path)
        #searched_locations = finders.searched_locations
        form = UserForm(request.GET)
        result['form']=form
        objects_100=CPU_usage.objects.all()[:100]
        objects_all=CPU_usage.objects.all()
        avg_100=objects_100.aggregate(Avg('percentage'))
        avg_all=objects_all.aggregate(Avg('percentage'))    
        result['avg_100']=round(avg_100['percentage__avg'],2)
        #print(result['avg_100'])
        result['avg_all']=round(avg_all['percentage__avg'],2)
        #print(result['avg_all'])
        max_100=objects_100.aggregate(Max('percentage'))
        result['max_100']=round(max_100['percentage__max'],2)
        #print(result['max_100'])
        max_all=objects_all.aggregate(Max('percentage'))
        result['max_all']=round(max_all['percentage__max'],2)
        #print(result['max_all'])
        min_100=objects_100.aggregate(Min('percentage'))
        result['min_100']=round(min_100['percentage__min'],2)
        #print(result['min_100'])
        min_all=objects_all.aggregate(Min('percentage'))
        result['min_all']=round(min_all['percentage__min'],2)
        #print(result['min_all'])
        result['data']=objects_100
        if form.is_valid():
            return render(request, "index.html", result)
    
    percentage=''

    if request.method == 'POST': 
        data = json.loads(request.body)
        percentage=(data['percentage'].replace('%',''))
        print('percentage=',percentage)
        obj=CPU_usage()
        obj.check_date=datetime.datetime.now()
        obj.percentage=int(percentage)
        obj.save()
        #form = UserForm(request.POST)
        #if form.is_valid():
        #    return render(request, "index.html", result)
    #userform = UserForm()  
    #result['form']=userform    
    #return render(request, "index.html", result)
    return HttpResponse("<h2>Процент    использования процессора {0}</h2>".format(percentage))
