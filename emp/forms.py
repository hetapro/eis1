from django import forms
from emp.models import Department

class NewEmpForm(forms.Form):
    ena = forms.CharField(label='Name', max_length=100,widget=forms.TextInput(attrs={'class':'c1'}))
    age = forms.CharField(label='Age', max_length=100)
    email = forms.EmailField(label='Email id', max_length=100)
    mob=forms.CharField(label='Mob no',widget=forms.TextInput(attrs={'class':'c2'}))
    designation = forms.CharField(label='Designation', max_length=100)
    department=forms.ModelChoiceField(label='Department',queryset=Department.objects.all(), to_field_name='department_name', empty_label="select")

#class NewDepForm(forms.Form):
 #   d1 = forms.CharField(label='Department Name', max_length=100,widget=forms.TextInput(attrs={'class':'department'}))



