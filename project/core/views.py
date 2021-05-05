from django.shortcuts import render

# Create your views here.


def test_page(request):
    ret = render(request, 'home.html',{})
    return ret