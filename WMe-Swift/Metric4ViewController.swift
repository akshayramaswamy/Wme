//
//  Metric4ViewController.swift
//  WMe-Swift
//
//  Created by Aneesh Pappu on 8/21/16.
//  Copyright © 2016 Akshay Ramaswamy. All rights reserved.
//

import UIKit

class Metric4ViewController: UIViewController{
    @IBOutlet var question4 : UILabel!
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        question4.text = "How do you think __ is doing?"
    }
}