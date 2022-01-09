from django import forms
from test_cs.models import CPU_usage

class UserForm(forms.Form):
    def __init__(self, *args, **kargs):
        super(UserForm, self).__init__(*args, **kargs)  


    class Meta:
         model = CPU_usage
         fields = '__all__'
